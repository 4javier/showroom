import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

export type LinkListItem = {
  name: string;
  path: string;
}

@Component({
  selector: 'showroom-nav-list',
  standalone: true,
  imports: [CommonModule, NgbNavModule, RouterLink],
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent {

  activeRoute$: Observable<string>;

  links: LinkListItem[] = [
    {name: 'Home', path: 'home'},
    {name: 'My Projects', path: 'projects'},
    {name: 'My Articles', path: 'articles'}
  ]

  constructor(public router: Router) {
    this.activeRoute$ = router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.url.split('/')[2]),
    )
  }
}