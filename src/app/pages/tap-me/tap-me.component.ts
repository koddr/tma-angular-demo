import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  hideBackButton,
  mountBackButton,
  onBackButtonClick,
  showBackButton,
  unmountBackButton,
} from '@telegram-apps/sdk';

@Component({
  selector: 'app-pages-tap-me',
  standalone: true,
  imports: [],
  templateUrl: './tap-me.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TapMePageComponent implements OnInit, OnDestroy {
  protected readonly router = inject(Router);

  ngOnInit() {
    try {
      mountBackButton.ifAvailable();
    } catch (error) {
      console.error(error);
      this.router.navigate(['platform-not-supported']);
      return;
    }

    showBackButton();
    onBackButtonClick(() => this.router.navigate(['']));
  }

  ngOnDestroy() {
    // Скрываем кнопку «Назад».
    hideBackButton();

    // Размонтируем все ранее смонтированные функциональные компоненты.
    unmountBackButton();
  }
}
