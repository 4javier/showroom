import { TestBed } from '@angular/core/testing';
import { AppComponent, REMOTE_URLS } from './app.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShadowRoutingAnimationService } from '@showroom/shared/shadow-routing-animation';
import { Component } from '@angular/core';

const LOCAL_REMOTE_URLS = {
  "fe-mat": "http://localhost:4201",
  "fe-bs": "http://localhost:4202"
}

let harness: RouterTestingHarness;

@Component({})
class StubComponent {}
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HomeComponent],
      providers: [
        provideRouter([
          {path: '**', component: StubComponent},
        ]),
        { provide: ShadowRoutingAnimationService, useValue: {} },
        { provide: REMOTE_URLS, useValue: LOCAL_REMOTE_URLS }
      ],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should detect fe-mat as active route`,async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    await harness.navigateByUrl('/fe-mat/whatever');
    fixture.detectChanges();
    fixture.componentInstance.activeRoute$.subscribe(active => expect(active).toBe('fe-mat'));
  });

  it(`should detect fe-bs as active route`,async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    await harness.navigateByUrl('/fe-bs/whatever');
    fixture.detectChanges();
    fixture.componentInstance.activeRoute$.subscribe(active => expect(active).toBe('fe-bs'));
  });

});
