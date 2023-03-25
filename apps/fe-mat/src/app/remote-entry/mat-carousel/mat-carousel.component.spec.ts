import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MatCarouselComponent } from './mat-carousel.component';

const stubSlide = (id: number) => ({
  title: `title-${id}`,
  content: `content-${id}`,
  link: `link-${id}`,
});

describe('MatCarouselComponent', () => {
  let component: MatCarouselComponent;
  let fixture: ComponentFixture<MatCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCarouselComponent],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(MatCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should cycle every 3 seconds', fakeAsync(() => {
    fixture = TestBed.createComponent(MatCarouselComponent);
    component = fixture.componentInstance;
    component.slides = [stubSlide(1), stubSlide(2), stubSlide(3)];
    fixture.detectChanges();

    tick(3000);
    fixture.detectChanges();
    discardPeriodicTasks()
    expect(component.focusedIndex).toBe(1);
  }));

  it('should pause cycling when hovered', fakeAsync(() => {
    fixture = TestBed.createComponent(MatCarouselComponent);
    component = fixture.componentInstance;
    component.slides = [stubSlide(1), stubSlide(2), stubSlide(3)];
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.slider-container')).triggerEventHandler('mouseenter');
    tick(6000);
    fixture.detectChanges();
    discardPeriodicTasks()
    expect(component.focusedIndex).toBe(0);

    fixture.debugElement.query(By.css('.slider-container')).triggerEventHandler('mouseleave');
    tick(6000);
    fixture.detectChanges();
    discardPeriodicTasks()
    expect(component.focusedIndex).toBe(2);
}));

  it('should stop cycling on first click and restart on second one',  fakeAsync(() => {
      fixture = TestBed.createComponent(MatCarouselComponent);
      component = fixture.componentInstance;
      component.slides = [stubSlide(1), stubSlide(2), stubSlide(3)];
      fixture.detectChanges();

      fixture.debugElement.query(By.css('.slider')).triggerEventHandler('click');
      tick(6000);
      fixture.detectChanges();
      discardPeriodicTasks()
      expect(component.focusedIndex).toBe(0);

      fixture.debugElement.query(By.css('.slider')).triggerEventHandler('click');
      tick(6000);
      fixture.detectChanges();
      discardPeriodicTasks()
      expect(component.focusedIndex).toBe(2);
  }));

  describe('when next button is clicked', () => {
    it('should slide forward if not at the end', () => {
      fixture = TestBed.createComponent(MatCarouselComponent);
      component = fixture.componentInstance;
      component.slides = [stubSlide(1), stubSlide(2), stubSlide(3)];
      fixture.detectChanges();

      fixture.debugElement.query(By.css('button[aria-label="Next slide"]')).triggerEventHandler('click');
      fixture.detectChanges();
      expect(component.focusedIndex).toBe(1);

    });

    it('should do nothing if at the end', () => {
      fixture = TestBed.createComponent(MatCarouselComponent);
      component = fixture.componentInstance;
      component.slides = [stubSlide(1), stubSlide(2), stubSlide(3)];
      component.focusedIndex = 2
      fixture.detectChanges();

      fixture.debugElement.query(By.css('button[aria-label="Next slide"]')).triggerEventHandler('click');
      fixture.detectChanges();
      expect(component.focusedIndex).toBe(2);
    });
  });

  describe('when previous button is clicked', () => {
    it('should slide backward if not at the beginning', () => {
      fixture = TestBed.createComponent(MatCarouselComponent);
      component = fixture.componentInstance;
      component.slides = [stubSlide(1), stubSlide(2), stubSlide(3)];
      component.focusedIndex = 2
      fixture.detectChanges();

      fixture.debugElement.query(By.css('button[aria-label="Previous slide"]')).triggerEventHandler('click');
      fixture.detectChanges();
      expect(component.focusedIndex).toBe(1);
    });

    it('should do nothing if at the beginning', () => {
      fixture = TestBed.createComponent(MatCarouselComponent);
      component = fixture.componentInstance;
      component.slides = [stubSlide(1), stubSlide(2), stubSlide(3)];
      fixture.detectChanges();

      fixture.debugElement.query(By.css('button[aria-label="Previous slide"]')).triggerEventHandler('click');
      fixture.detectChanges();
      expect(component.focusedIndex).toBe(0);
    });
  });
});
