import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarousel, NgbCarouselConfig, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { fadeIn } from '../../animations';
import { SlideData } from '@showroom/shared/data-fetching';

@Component({
  selector: 'showroom-bs-carousel',
  standalone: true,
  imports: [CommonModule, NgbCarousel, NgbSlide],
  templateUrl: './bs-carousel.component.html',
  styleUrls: ['./bs-carousel.component.scss'],
  animations: [fadeIn]
})
export class BsCarouselComponent {
  
  @Input()
  isLoading = false;
  @Input()
  slides: SlideData[] = [];

  constructor(private carouselConfig: NgbCarouselConfig) {
    
    this.carouselConfig.showNavigationIndicators = false;
  }
}
