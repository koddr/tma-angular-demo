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

    setMainButtonParams({
      backgroundColor: '#000000',
      hasShineEffect: true,
      isEnabled: true,
      isLoaderVisible: true,
      isVisible: true,
      text: 'Пошли тапать!',
      textColor: '#ffffff',
    });
    onMainButtonClick(() => this.router.navigate(['tap-me']));
  }

  ngOnDestroy() {
    unmountMainButton();
  }
}
