import { Directive, HostListener, inject } from '@angular/core';
import { setCloudStorageItem } from '@telegram-apps/sdk';
import confetti from 'canvas-confetti';
import { ScoreStore } from 'src/app/app.store';

@Directive({
  selector: '[appDelayClick]',
  standalone: true,
})
export class DelayClickDirective {
  private readonly store = inject(ScoreStore);

  // Опции для эффекта конфетти:
  private readonly confettiOptions: confetti.Options = {
    particleCount: 500,
    startVelocity: 30,
    spread: 360,
  };

  private abortController: AbortController | null = null; // контроллер для прерывания задержки

  @HostListener('click') async onClick() {
    if (this.abortController) this.abortController.abort(); // прерываем задержку

    this.abortController = new AbortController(); // создаем контроллер для прерывания задержки
    const { signal } = this.abortController; // сигнал контроллера для прерывания

    try {
      this.store.updateScore(); // обновляем счетчик

      // Добавляем эффект конфетти каждый раз при получении 100 очков:
      if (this.store.score() % 100 === 0) confetti(this.confettiOptions);

      // Останавливаем обработку клика после 1 секунды:
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, 1000); // задержка 1 секунда
        signal.addEventListener('abort', () => {
          clearTimeout(timeout); // прерываем задержку
          reject(new DOMException('Aborted', 'AbortError')); // прерываем обработку
        });
      });

      // Сохраняем значение счетчика в Telegram Cloud Storage:
      await setCloudStorageItem.ifAvailable(
        'score',
        this.store.score().toString(),
      );
    } catch (error: DOMException | unknown) {
      // Если где-то упала ошибка, то показываем её в консоли:
      if (error instanceof DOMException && error.name !== 'AbortError') {
        console.error(error);
      }
    }
  }
}
