import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SrBsTileComponent } from './sr-bs-tile.component';

describe('SrBsTileComponent', () => {
  let component: SrBsTileComponent;
  let fixture: ComponentFixture<SrBsTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SrBsTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SrBsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
