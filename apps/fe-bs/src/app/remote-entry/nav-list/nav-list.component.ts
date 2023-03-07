import { Component, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveOffcanvas, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, Observable, startWith, tap } from 'rxjs';

export type LinkListItem = {
  name: string;
  path: string;
}

@Component({
  selector: 'showroom-nav-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbNavModule ],
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent {

  activeRoute$: Observable<string>;

  links: LinkListItem[] = [
    { name: 'Home', path: 'home' },
    { name: 'My Projects', path: 'projects' },
    { name: 'My Articles', path: 'articles' }
  ]

  constructor(
    router: Router,
    @Optional() activeOffcanvas?: NgbActiveOffcanvas
  ) {
    this.activeRoute$ = router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.url),
      tap(() => activeOffcanvas?.close()),
      startWith(router.url),
      map(url => url.split('/')[2]),
    )
  }
}