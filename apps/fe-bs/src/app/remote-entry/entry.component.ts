import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { RouterOutlet } from '@angular/router';
import { RoutingAnimationService, slideLeftAnimation } from '@showroom/shared/routing-animation'

@Component({
  standalone: true,
  imports: [CommonModule, NavListComponent, RouterOutlet ],
  selector: 'showroom-fe-bs-entry',
  templateUrl: 'remote-entry.component.html',
  styleUrls: ['remote-entry.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [slideLeftAnimation],
  host: { 'style': 'display: block' }
})
export class RemoteEntryComponent {
  
  clear$ = this.ras.clear$;
  slide$ = this.ras.slide$;

  constructor(public ras: RoutingAnimationService){}


}