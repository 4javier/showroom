import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  BehaviorSubject,
  combineLatest,
  interval,
  NEVER,
  ReplaySubject,
  scan,
  switchMap,
  takeUntil,
} from 'rxjs';
import { SlideData } from '@showroom/shared/data-fetching';

@Component({
  selector: 'showroom-mat-carousel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './mat-carousel.component.html',
  styleUrls: ['./mat-carousel.component.scss'],
})
export class MatCarouselComponent implements OnDestroy {
  @Input()
  isLoading = false;
  @Input()
  slides: SlideData[] = [];
  _focusIndex = 0;
  translate = '';
  set focusedIndex(i: number) {
    i === 0
      ? (this.translate = '')
      : (this.translate = `transform: translateX(-${75 + 85 * (i - 1)}%)`);
    this._focusIndex = i;
  }
  get focusedIndex() {
    return this._focusIndex;
  }
  private paused$ = new BehaviorSubject<boolean>(false);
  private toggleAutoplay$ = new BehaviorSubject<void>(void 0);
  private stopped$ = this.toggleAutoplay$.pipe(scan((acc) => !acc, true));
  private destroy$ = new ReplaySubject<boolean>();

  constructor() {
    combineLatest([this.paused$, this.stopped$])
      .pipe(
        switchMap(([paused, stopped]) =>
          !!paused || !!stopped ? NEVER : interval(3000)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(this.cycleSlides);
  }

  nextSlide() {
    this.focusedIndex < this.slides.length - 1 ? this.focusedIndex++ : null;
  }

  prevSlide() {
    this.focusedIndex > 0 ? this.focusedIndex-- : null;
  }

  cycleSlides = () => {
    if (this.focusedIndex === this.slides.length - 1) this.focusedIndex = 0;
    else this.focusedIndex++;
  };

  pauseOn() {
    this.paused$.next(true);
  }

  pauseOff() {
    this.paused$.next(false);
  }

  toggleStop() {
    this.toggleAutoplay$.next();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
