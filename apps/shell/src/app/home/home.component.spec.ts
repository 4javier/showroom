import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Directive } from '@angular/core';
import {
  ShadowRoutingAnimationDirective,
  ShadowRoutingAnimationService,
} from '@showroom/shared/shadow-routing-animation';
import { Subject } from 'rxjs';
import { LightRoutingAnimationService } from '@showroom/shared/light-routing-animation';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

const lrasMock = { rendered$: new Subject<boolean>() };

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[sr-sra]', standalone: true })
class sraStubDirective {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
      providers: [
        provideNoopAnimations(),
        { provide: ShadowRoutingAnimationService, useValue: null },
      ],
    })
      .overrideComponent(HomeComponent, {
        remove: {
          imports: [ShadowRoutingAnimationDirective],
        },
        add: {
          imports: [sraStubDirective],
        },
      })
      .overrideComponent(HomeComponent, {
        set: {
          providers: [
            { provide: LightRoutingAnimationService, useValue: lrasMock },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
