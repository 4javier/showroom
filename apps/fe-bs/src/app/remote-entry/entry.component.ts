import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { RouterOutlet } from '@angular/router';
import { ShadowRoutingAnimationDirective, shadowSlideLeftAnimation } from '@showroom/shared/shadow-routing-animation'
import { LightRoutingAnimationHostDirective, lightSlideLeftAnimation } from '@showroom/shared/light-routing-animation'

@Component({
  standalone: true,
  imports: [
    CommonModule, RouterOutlet,
    ShadowRoutingAnimationDirective, LightRoutingAnimationHostDirective,
    NavListComponent
  ],
  selector: 'showroom-fe-bs-entry',
  templateUrl: 'remote-entry.component.html',
  styleUrls: ['remote-entry.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [shadowSlideLeftAnimation, lightSlideLeftAnimation],
  host: { 'style': 'display: block' }
})
export class RemoteEntryComponent {

}