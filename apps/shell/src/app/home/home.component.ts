import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadowRoutingAnimationDirective, slideLeftAnimation } from '@showroom/shared/routing-animation';

@Component({
  selector: 'showroom-home',
  standalone: true,
  imports: [CommonModule, ShadowRoutingAnimationDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideLeftAnimation],
})
export class HomeComponent {}
