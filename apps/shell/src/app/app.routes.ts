import { Route } from '@angular/router';
import { loadRemoteModule } from '@nrwl/angular/mf';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
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

];
