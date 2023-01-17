import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nrwl/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'fe-bs',
    loadChildren: () =>
      loadRemoteModule('fe-bs', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'fe-mat',
    loadChildren: () =>
      loadRemoteModule('fe-mat', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
