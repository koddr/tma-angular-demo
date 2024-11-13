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
  standalone: true,
  imports: [TuiAppearance, TuiCardMedium, TuiCardLarge, TuiTitle, TuiIcon],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {
  protected readonly router = inject(Router);

  protected readonly links = {
    author: 'https://t.me/koddr',
    github: 'https://github.com/koddr/tma-angular-demo',
    presentation: 'https://github.com/koddr/tma-angular-demo',
  };

  ngOnInit() {
    try {
      mountMainButton.ifAvailable();
    } catch (error) {
      console.error(error);
      this.router.navigate(['platform-not-supported']);
      return;
    }

    // Показываем кнопку «Тапалка тут» c дополнительными параметрами.
    setMainButtonParams({
      hasShineEffect: true,
      isEnabled: true,
      isVisible: true,
      text: 'Тапалка тут',
    });
    onMainButtonClick(() => this.router.navigate(['tap-me'])); // обрабатываем нажатие на кнопку «Тапалка тут»
  }

  ngOnDestroy() {
    // Скрываем кнопку «Тапалка тут».
    setMainButtonParams({
      isEnabled: false,
      isVisible: false,
    });

    // Размонтируем все ранее смонтированные функциональные компоненты.
    unmountMainButton();
  }
}
