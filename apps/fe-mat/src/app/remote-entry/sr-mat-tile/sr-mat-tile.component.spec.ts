import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrMatTileComponent } from './sr-mat-tile.component';

describe('SrMatTileComponent', () => {
  let component: SrMatTileComponent;
  let fixture: ComponentFixture<SrMatTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SrMatTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SrMatTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
