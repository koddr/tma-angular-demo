import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiAppearance, TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiCardMedium } from '@taiga-ui/layout';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-pages-platform-not-supported',
  imports: [
    TuiAppearance,
    TuiCardMedium,
    TuiCardLarge,
    TuiTitle,
    TuiIcon,
    QRCodeComponent,
  ],
  templateUrl: './platform-not-supported.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformNotSupportedPageComponent {}
