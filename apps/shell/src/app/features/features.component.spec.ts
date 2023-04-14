import { Directive } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ShadowRoutingAnimationDirective,
  ShadowRoutingAnimationService,
} from '@showroom/shared/shadow-routing-animation';
import { EMPTY } from 'rxjs';
import { FeaturesComponent } from './features.component';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[sr-sra]', standalone: true })
class sraStubDirective {}

describe('HomeComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesComponent, NoopAnimationsModule],
      providers: [
        { provide: ShadowRoutingAnimationService, useValue: { slide$: EMPTY } },
      ],
    })
      .overrideComponent(FeaturesComponent, {
        remove: {
          imports: [ShadowRoutingAnimationDirective],
        },
        add: {
          imports: [sraStubDirective],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
