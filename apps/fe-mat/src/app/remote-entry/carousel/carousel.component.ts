import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { SlideData } from 'libs/shared/data-fetching/src/lib/model';

@Component({
  selector: 'showroom-carousel',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {

  slides?: SlideData[];

}
