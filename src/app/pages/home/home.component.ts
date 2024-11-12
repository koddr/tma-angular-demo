import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiAppearance, TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiCardMedium } from '@taiga-ui/layout';

@Component({
  selector: 'app-pages-home',
  standalone: true,
  imports: [TuiAppearance, TuiCardMedium, TuiCardLarge, TuiTitle, TuiIcon],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  protected readonly links = {
    author: 'https://t.me/koddr',
    github: 'https://github.com/koddr/tma-angular-demo',
    presentation: 'https://github.com/koddr/tma-angular-demo',
  };
}
