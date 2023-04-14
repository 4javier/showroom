import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  LightRoutingAnimationHostDirective,
  lightSlideLeftAnimation,
} from '@showroom/shared/light-routing-animation';
import {
  ShadowRoutingAnimationDirective,
  shadowSlideLeftAnimation,
} from '@showroom/shared/shadow-routing-animation';

@Component({
  selector: 'showroom-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ShadowRoutingAnimationDirective,
    LightRoutingAnimationHostDirective,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [shadowSlideLeftAnimation, lightSlideLeftAnimation],
})
export class HomeComponent {}
