import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { PlatformNotSupportedPageComponent } from './pages/platform-not-supported/platform-not-supported.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: 'platform-not-supported',
    component: PlatformNotSupportedPageComponent,
  },
];
