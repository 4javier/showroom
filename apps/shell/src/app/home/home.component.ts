import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadowRoutingAnimationDirective, shadowSlideLeftAnimation } from '@showroom/shared/shadow-routing-animation';

@Component({
  selector: 'showroom-home',
  standalone: true,
  imports: [CommonModule, ShadowRoutingAnimationDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [shadowSlideLeftAnimation],
})
export class HomeComponent {}
