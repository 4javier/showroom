import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { ShadowRoutingAnimationDirective, shadowSlideLeftAnimation } from '@showroom/shared/shadow-routing-animation'

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, ShadowRoutingAnimationDirective, NavListComponent],
  selector: 'showroom-fe-bs-entry',
  templateUrl: 'remote-entry.component.html',
  styleUrls: ['remote-entry.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [shadowSlideLeftAnimation]
  host: { 'style': 'display: block' }
})
export class RemoteEntryComponent {}