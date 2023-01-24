import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list'; 
import { MatIconModule } from '@angular/material/icon'; 
import { RouterModule } from '@angular/router';

export type LinkListItem = {
  name: string;
  path: string;
}

@Component({
  selector: 'showroom-nav-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatListModule],
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent {
  links: LinkListItem[] = [
    {name: 'Home', path: 'home'},
    {name: 'My Projects', path: 'projects'},
    {name: 'My Articles', path: 'articles'}
  ]
}
