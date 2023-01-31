import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'

export interface SlideData {
  title: string;
  image: string;
  content: string;
  link: string;
  origin?: string;
}

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
