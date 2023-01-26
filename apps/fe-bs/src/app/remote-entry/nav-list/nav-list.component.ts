import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterLink } from '@angular/router';

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

  links: LinkListItem[] = [
    {name: 'Home', path: 'home'},
    {name: 'My Projects', path: 'projects'},
    {name: 'My Articles', path: 'articles'}
  ]

  constructor(public route: ActivatedRoute) {}
}