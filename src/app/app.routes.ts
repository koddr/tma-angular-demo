import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { PlatformNotSupportedPageComponent } from './pages/platform-not-supported/platform-not-supported.component';
import { TapMePageComponent } from './pages/tap-me/tap-me.component';

export const appRoutes: Route[] = [
  {
    path: 'tap-me',
    component: TapMePageComponent,
  },
  {
    path: 'platform-not-supported',
    component: PlatformNotSupportedPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
];
