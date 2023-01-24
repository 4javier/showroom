import { Route } from '@angular/router';

import { ArticlesComponent } from './remote-entry/articles/articles.component';
import { RemoteEntryComponent } from './remote-entry/entry.component';
import { HomeComponent } from './remote-entry/home/home.component';
import { ProjectsComponent } from './remote-entry/projects/projects.component';

/* export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
]; */

import('./remote-entry/entry.routes')

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'articles', component: ArticlesComponent }, 
]
