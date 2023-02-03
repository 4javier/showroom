import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { SlideData } from 'libs/shared/data-fetching/src/lib/model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, filter, interval, repeat, take, takeUntil } from 'rxjs';

@Component({
  selector: 'showroom-carousel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {

  @Input()
  slides: SlideData[] = [];
  _focusIndex = 0;
  translate = ''
  set focusedIndex(i: number) {
    i === 0 
      ? this.translate = ''
      : this.translate = `transform: translateX(-${75+85*(i-1)}%)`
    this._focusIndex = i;
  };
  get focusedIndex() {
    return this._focusIndex;
  }
  paused$ = new BehaviorSubject<boolean>(false);
  ngOnInit() {
    interval(3000).pipe(
      take(this.slides.length),
      takeUntil(this.paused$.pipe(filter(value => !!value))),
      repeat({delay: () => this.paused$.pipe(filter(value => !value))})
    )
    .subscribe(this.cycleSlides)
  }
  nextSlide() {
    this.focusedIndex < this.slides.length-1 ? this.focusedIndex++ : null
  }

  prevSlide() {
    this.focusedIndex > 0 ? this.focusedIndex-- : null
  }

  cycleSlides = () => {
    if (this.focusedIndex === this.slides.length-1)
      this.focusedIndex = 0;
    else 
      this.focusedIndex++;
  }
}
