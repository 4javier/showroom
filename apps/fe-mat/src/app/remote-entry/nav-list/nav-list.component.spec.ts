import { Component, NgZone } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { NavListComponent } from './nav-list.component';

@Component({})
class StubComponent {}

describe('NavListComponent', () => {
  let component: NavListComponent;
  let fixture: ComponentFixture<NavListComponent>;
  let harness: RouterTestingHarness;
  let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavListComponent],
      providers: [provideRouter([{ path: '**', component: StubComponent }])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavListComponent);
    ngZone = TestBed.inject(NgZone);
    component = fixture.componentInstance;
    harness = await RouterTestingHarness.create();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should detect home as active route`, async () => {
    await ngZone.run(() => harness.navigateByUrl('/home'));
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('a#Home')).classes[
        'mdc-list-item--activated'
      ]
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('a#Articles')).classes[
        'mdc-list-item--activated'
      ]
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('a#Projects')).classes[
        'mdc-list-item--activated'
      ]
    ).toBeFalsy();
  });

  it(`should detect projects as active route`, async () => {
    await ngZone.run(() =>harness.navigateByUrl('/projects'));
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('a#Home')).classes[
        'mdc-list-item--activated'
      ]
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('a#Articles')).classes[
        'mdc-list-item--activated'
      ]
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('a#Projects')).classes[
        'mdc-list-item--activated'
      ]
    ).toBeTruthy();
  });

  it(`should detect articles as active route`, async () => {
    await ngZone.run(() =>harness.navigateByUrl('/articles'));
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('a#Home')).classes[
        'mdc-list-item--activated'
      ]
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('a#Articles')).classes[
        'mdc-list-item--activated'
      ]
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('a#Projects')).classes[
        'mdc-list-item--activated'
      ]
    ).toBeFalsy();
  });
});
