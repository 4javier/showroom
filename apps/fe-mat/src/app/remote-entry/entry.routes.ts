import { Route } from '@angular/router';
import { appRoutes } from '../app.routes';
import { ArticlesComponent } from './articles/articles.component';
import { RemoteEntryComponent } from './entry.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';

export const remoteRoutes: Route[] = [
  { 
    path: '',
    component: RemoteEntryComponent,
    children: appRoutes
  }
];
