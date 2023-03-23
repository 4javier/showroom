import { Component, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LightRoutingAnimationService } from '@showroom/shared/light-routing-animation';
import {
  ShadowRoutingAnimationDirective,
  ShadowRoutingAnimationService,
} from '@showroom/shared/shadow-routing-animation';
import { Subject } from 'rxjs';
import { RemoteEntryComponent } from './entry.component';
import { NavListComponent } from './nav-list/nav-list.component';

const _ocActiveInst = {
  close: () => {
    return;
  },
};
const _hidden = new Subject<void>();

const offcanvasServiceMock = {
  activeInstance: new Subject<{ close: () => void }>(),
  open: () => ({ hidden: _hidden }),
};

const lrasMock = { rendered$: new Subject<boolean>() };

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[sr-sra]', standalone: true })
class sraStubDirective {}
@Component({ selector: 'showroom-nav-list', standalone: true })
class navListStubComponent {}
describe('HomeComponent', () => {
  let component: RemoteEntryComponent;
  let fixture: ComponentFixture<RemoteEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoteEntryComponent, sraStubDirective],
      providers: [
        provideNoopAnimations(),
        { provide: NgbOffcanvas, useValue: offcanvasServiceMock },
        { provide: ShadowRoutingAnimationService, useValue: null },
      ],
    })
      .overrideComponent(RemoteEntryComponent, {
        remove: {
          imports: [ShadowRoutingAnimationDirective, NavListComponent],
        },
        add: {
          imports: [sraStubDirective, navListStubComponent],
        },
      })
      .overrideComponent(RemoteEntryComponent, {
        set: {
          providers: [
            { provide: LightRoutingAnimationService, useValue: lrasMock },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RemoteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close sidenav when content is rendered', () => {
    const ocSpy = jest.spyOn(_ocActiveInst, 'close');
    offcanvasServiceMock.activeInstance.next(_ocActiveInst);
    lrasMock.rendered$.next(true);
    expect(ocSpy).toBeCalledTimes(1);
  });

  it('should open sidenav when button disappear', () => {
    const openSidenavSpy = jest.spyOn(component, 'openSidenav');
    fixture.debugElement
      .query(By.css('.sr-sidenav-toggle-btn'))
      .triggerEventHandler('@ocBtnSlideOutFromLeft.done', {
        fromState: 'whatever',
        phaseName: 'done',
        toState: 'void',
        totalTime: 0,
        triggerName: 'ocBtnSlideOutFromLeft',
      });
    expect(openSidenavSpy).toBeCalledTimes(1);
  });

  it('should re-show button after sidenav is closed', waitForAsync(() => {
    component.hideButton$.next(true);
    fixture.detectChanges();
    fixture.whenRenderingDone().then(() => {
      expect(
        fixture.debugElement.query(By.css('.sr-sidenav-toggle-btn'))
      ).toBeFalsy();

      component.openSidenav();
      _hidden.next();
      fixture.detectChanges();
      expect(
        fixture.debugElement.query(By.css('.sr-sidenav-toggle-btn'))
      ).toBeTruthy();
    });
  }));
});
