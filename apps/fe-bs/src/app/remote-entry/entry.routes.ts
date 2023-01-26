import { Route } from '@angular/router';
import { appRoutes } from '../app.routes';
import { RemoteEntryComponent } from './entry.component';

/* export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent },
]; */

export const remoteRoutes: Route[] = [
  { 
    path: '',
    component: RemoteEntryComponent,
    children: appRoutes
  }
];

