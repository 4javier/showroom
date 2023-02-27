import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingAnimationService, slideLeftAnimation } from '@showroom/shared/routing-animation';

@Component({
  selector: 'showroom-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideLeftAnimation],
})
export class HomeComponent {
  
  clear$ = this.ras.clear$;
  slide$ = this.ras.slide$;

  constructor(public ras: RoutingAnimationService) {}

}
