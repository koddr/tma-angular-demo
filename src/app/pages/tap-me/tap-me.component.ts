import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { TuiAppearance, TuiButton, TuiTitle } from '@taiga-ui/core';
import { TuiSkeleton } from '@taiga-ui/kit';
import { TuiBlockStatus, TuiCardLarge } from '@taiga-ui/layout';
import {
  getCloudStorageItem,
  hideBackButton,
  mountBackButton,
  onBackButtonClick,
  showBackButton,
  unmountBackButton,
} from '@telegram-apps/sdk';
import { ScoreStore } from 'src/app/app.store';
import { DelayClickDirective } from 'src/directives/delay-click.directive';

@Component({
  selector: 'app-pages-tap-me',
  imports: [
    DelayClickDirective,
    TuiBlockStatus,
    TuiButton,
    TuiAppearance,
    TuiCardLarge,
    TuiSkeleton,
    TuiTitle,
  ],
  templateUrl: './tap-me.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapMePageComponent implements OnInit, OnDestroy {
  protected readonly router = inject(Router);
  protected readonly store = inject(ScoreStore);

  async ngOnInit() {
    try {
      mountBackButton.ifAvailable(); // монтируем кнопку «Назад»

      // Восстанавливаем значение счетчика из Telegram Cloud Storage
      // и сохраняем его в качестве начального значения компонента:
      await this.store.setInitialScore(
        await getCloudStorageItem.ifAvailable('score'), // значение в Telegram Cloud Storage должно быть в ключе 'score'
      );
    } catch (error) {
      console.error(error); // если где-то упала ошибка, то показываем её в консоли
      this.router.navigate(['platform-not-supported']); // делаем редирект на заглушку
      return;
    }

    showBackButton(); // показываем кнопку «Назад»
    onBackButtonClick(() => this.router.navigate([''])); // обрабатываем нажатие на кнопку «Назад»
  }

  ngOnDestroy() {
    hideBackButton(); // скрываем кнопку «Назад»

    // Размонтируем все ранее смонтированные функциональные компоненты
    // TypeScript-враппера Telegram SDK в том же порядке:
    unmountBackButton();
  }
}
