import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoButtonComponent } from './logo-button.component';

describe('LogoButtonComponent', () => {
  let component: LogoButtonComponent;
  let fixture: ComponentFixture<LogoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should turn to activating when clicked if for internal routing', () => {
    expect(fixture.debugElement.classes['activating']).toBeFalsy();
    fixture.nativeElement.click()
    fixture.detectChanges();
    expect(fixture.debugElement.classes['activating']).toBeTruthy();
  });

  it('should turn from activating to activated on property binding', () => {
    component.activating = true;
    fixture.detectChanges();
    expect(fixture.debugElement.classes['activating']).toBeTruthy();
    expect(fixture.debugElement.classes['activated']).toBeFalsy();
    component.activated = true;
    fixture.detectChanges();
    expect(fixture.debugElement.classes['activating']).toBeFalsy();
    expect(fixture.debugElement.classes['activated']).toBeTruthy();  });
});
