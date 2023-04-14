import { Route } from '@angular/router';
import { loadRemoteModule } from '@nrwl/angular/mf';
import { FeaturesComponent } from './features/features.component';
import { InfographicComponent } from './infographic/infographic.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'info',
        component: InfographicComponent,
      },
      {
        path: 'features',
        component: FeaturesComponent,
      },
    ],
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
