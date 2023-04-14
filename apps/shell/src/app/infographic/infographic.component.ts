import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ShadowRoutingAnimationDirective,
  shadowSlideLeftAnimation,
} from '@showroom/shared/shadow-routing-animation';

@Component({
  selector: 'showroom-infographic',
  standalone: true,
  imports: [CommonModule, ShadowRoutingAnimationDirective],
  templateUrl: './infographic.component.html',
  styleUrls: ['./infographic.component.scss'],
  animations: [shadowSlideLeftAnimation],
})
export class InfographicComponent {
  public shellActive: '--shell-active' | '--shell-inactive' | '' = '';

  toggleShellActive() {
    if (this.shellActive === '--shell-inactive' || this.shellActive === '') {
      this.shellActive = '--shell-active';
    } else this.shellActive = '--shell-inactive';
  }
}
