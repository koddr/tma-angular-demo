import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TUI_DARK_MODE, TuiRoot } from '@taiga-ui/core';
import {
  disableVerticalSwipes,
  enableClosingConfirmation,
  expandViewport,
  init,
  miniAppReady,
  mountClosingBehavior,
  mountMiniApp,
  mountSwipeBehavior,
  mountViewport,
  restoreInitData,
  unmountClosingBehavior,
  unmountMiniApp,
  unmountSwipeBehavior,
  unmountViewport,
} from '@telegram-apps/sdk';

@Component({
  standalone: true,
  imports: [RouterOutlet, TuiRoot],
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  protected readonly router = inject(Router);
  protected readonly darkMode = inject(TUI_DARK_MODE); // подключаем свитчер тёмной темы от Taiga UI

  async ngOnInit() {
    try {
      init(); // инициализация Telegram мини-аппы
      restoreInitData(); // восстановление состояния компонентов
      mountViewport.ifAvailable(); // монтируем viewport мини-аппы
      mountClosingBehavior.ifAvailable(); // монтируем функции для поведения при закрытии мини-аппы
      mountSwipeBehavior.ifAvailable(); // монтируем функции для поведения при свайпе мини-аппы
      mountMiniApp.ifAvailable(); // монтируем саму мини-аппу
    } catch (error) {
      console.error(error); // если где-то упала ошибка, то показываем её в консоли
      this.router.navigate(['platform-not-supported']); // делаем редирект на заглушку для этих пользователей
      return;
    }

    expandViewport.ifAvailable(); // разворачиваем viewport мини-аппы на весь экран Telegram-браузера
    enableClosingConfirmation.ifAvailable(); // включаем принудительное подтверждение о закрытии мини-аппы
    disableVerticalSwipes.ifAvailable(); // отключаем закрытие мини-аппы при вертикальном свайпе (сверху вниз)
    miniAppReady.ifAvailable(); // даём понять всем компонентам мини-аппы, что она успешно запустилась
  }

  ngOnDestroy() {
    // Размонтируем все ранее смонтированные функциональные компоненты
    // TypeScript-враппера Telegram SDK в том же порядке:
    unmountViewport();
    unmountClosingBehavior();
    unmountSwipeBehavior();
    unmountMiniApp();
  }
}
