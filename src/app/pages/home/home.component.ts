import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { TuiAppearance, TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiCardMedium } from '@taiga-ui/layout';
import {
  mountMainButton,
  onMainButtonClick,
  setMainButtonParams,
  unmountMainButton,
} from '@telegram-apps/sdk';

@Component({
  selector: 'app-pages-home',
  imports: [TuiAppearance, TuiCardMedium, TuiCardLarge, TuiTitle, TuiIcon],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {
  protected readonly router = inject(Router);

  // Объект со ссылками на соцсети и презентацию для удобной работы в шаблоне:
  protected readonly links = {
    author: 'https://t.me/koddr',
    github: 'https://github.com/koddr/tma-angular-demo',
    presentation: 'https://github.com/koddr/tma-angular-demo',
  };

  ngOnInit() {
    try {
      mountMainButton.ifAvailable(); // монтируем главную кнопку
    } catch (error) {
      console.error(error); // если где-то упала ошибка, то показываем её в консоли
      this.router.navigate(['platform-not-supported']); // делаем редирект на заглушку
      return;
    }

    // Показываем главную кнопку с названием «Тапалка тут» и доп. параметрами:
    setMainButtonParams({
      text: 'Тапалка тут',
      hasShineEffect: true,
      isEnabled: true,
      isVisible: true,
    });
    onMainButtonClick(() => this.router.navigate(['tap-me'])); // обрабатываем нажатие на главную кнопку
  }

  ngOnDestroy() {
    // Скрываем главную кнопку:
    setMainButtonParams({
      isEnabled: false,
      isVisible: false,
    });

    // Размонтируем все ранее смонтированные функциональные компоненты
    // TypeScript-враппера Telegram SDK в том же порядке:
    unmountMainButton();
  }
}
