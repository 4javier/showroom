import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ShadowRoutingAnimationDirective,
  shadowSlideLeftAnimation,
} from '@showroom/shared/shadow-routing-animation';

@Component({
  selector: 'showroom-features',
  standalone: true,
  imports: [CommonModule, ShadowRoutingAnimationDirective],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  animations: [shadowSlideLeftAnimation],
})
export class FeaturesComponent {}
