import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarousel, NgbCarouselConfig, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { SlideData } from 'libs/shared/data-fetching/src/lib/model';

@Component({
  selector: 'showroom-bs-carousel',
  standalone: true,
  imports: [CommonModule, NgbCarousel, NgbSlide],
  templateUrl: './bs-carousel.component.html',
  styleUrls: ['./bs-carousel.component.scss'],
})
export class BsCarouselComponent {

  @Input()
  slides: SlideData[] = [];

  constructor(private carouselConfig: NgbCarouselConfig) {
    
    this.carouselConfig.showNavigationIndicators = false;
  }
}
