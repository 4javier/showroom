import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCarouselComponent } from './mat-carousel.component';

describe('CarouselComponent', () => {
  let component: MatCarouselComponent;
  let fixture: ComponentFixture<MatCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
