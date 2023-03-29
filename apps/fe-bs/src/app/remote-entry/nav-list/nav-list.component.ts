import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, Observable, startWith, tap } from 'rxjs';

export type LinkListItem = {
  name: string;
  path: string;
};

@Component({
  selector: 'showroom-nav-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbNavModule],
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent {
  activeRoute$: Observable<string>;

  links: LinkListItem[] = [
    { name: 'Home', path: 'home' },
    { name: 'Projects', path: 'projects' },
    { name: 'Articles', path: 'articles' },
  ];

  constructor(router: Router) {
    this.activeRoute$ = router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.url),
      startWith(router.url),
      map((url) => url.split('/')[2])
    );
  }
}
