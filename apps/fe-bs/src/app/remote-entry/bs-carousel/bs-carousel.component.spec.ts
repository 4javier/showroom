import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BsCarouselComponent } from './bs-carousel.component';

describe('BsCarouselComponent', () => {
  let component: BsCarouselComponent;
  let fixture: ComponentFixture<BsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BsCarouselComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
