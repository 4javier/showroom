import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { SlideData } from 'libs/shared/data-fetching/src/lib/model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, combineLatest, interval, NEVER, ReplaySubject, scan, startWith, switchMap, takeUntil } from 'rxjs';
import { log } from 'console';

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
  private paused$ = new BehaviorSubject<boolean>(false);
  private toggleAutoplay$ = new BehaviorSubject<void>(void 0)
  private stopped$ = this.toggleAutoplay$.pipe(
    scan((acc, _) => !acc, true)
  );
  private destroy$ = new ReplaySubject<boolean>();
  
  ngOnInit() {

    combineLatest([this.paused$, this.stopped$]).pipe(
      switchMap(([paused, stopped]) => !!paused || !!stopped ? NEVER : interval(3000)),
      takeUntil(this.destroy$)
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

  pauseOn() {
    this.paused$.next(true)
  }

  pauseOff() {
    this.paused$.next(false)
  }

  toggleStop() {
    this.toggleAutoplay$.next();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
