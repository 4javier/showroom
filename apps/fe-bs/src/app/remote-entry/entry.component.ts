import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { RouterOutlet } from '@angular/router';
import { fromLeft } from '../animations';

@Component({
  standalone: true,
  imports: [CommonModule, NavListComponent, RouterOutlet ],
  selector: 'showroom-fe-bs-entry',
  templateUrl: 'remote-entry.component.html',
  styleUrls: ['remote-entry.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [fromLeft],
  host: { 'style': 'display: block' }
})
export class RemoteEntryComponent {
  @HostBinding('class.animate-from-left') animated = true;

}