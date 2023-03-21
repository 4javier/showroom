import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';

import { NavListComponent } from './nav-list.component';

let harness: RouterTestingHarness;

@Component({})
class StubComponent {}

describe('NavListComponent', () => {
  let component: NavListComponent;
  let fixture: ComponentFixture<NavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavListComponent],
      providers: [ 
        provideRouter([
          {path: '**', component: StubComponent},
        ]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavListComponent);
    component = fixture.componentInstance;
    harness = await RouterTestingHarness.create();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should detect home as active route`,async () => {
    await harness.navigateByUrl('/home');
    fixture.detectChanges();
    fixture.componentInstance.activeRoute$.subscribe(active => expect(active).toBe('home'));
  });

  it(`should detect projects as active route`,async () => {
    await harness.navigateByUrl('/projects');
    fixture.detectChanges();
    fixture.componentInstance.activeRoute$.subscribe(active => expect(active).toBe('projects'));
  });

  it(`should detect articles as active route`,async () => {
    await harness.navigateByUrl('/articles');
    fixture.detectChanges();
    fixture.componentInstance.activeRoute$.subscribe(active => expect(active).toBe('articles'));
  });
});
