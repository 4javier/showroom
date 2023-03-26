import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Directive, Renderer2 } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LightRoutingAnimationService } from '@showroom/shared/light-routing-animation';
import {
  ShadowRoutingAnimationDirective,
  ShadowRoutingAnimationService,
} from '@showroom/shared/shadow-routing-animation';
import { ReplaySubject, Subject } from 'rxjs';
import {
  FONT_REF,
  ICON_REF,
  RemoteEntryComponent,
  TEST_MAT_THEME_REF,
} from './entry.component';
import { NavListComponent } from './nav-list/nav-list.component';

const _isSmall$ = new ReplaySubject<{ matches: boolean }>();
const bpObserverMock = {
  observe: () => _isSmall$,
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
        { provide: BreakpointObserver, useValue: bpObserverMock },
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
  });

  it('should create', () => {
    _isSmall$.next({ matches: true });
    fixture = TestBed.createComponent(RemoteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should close sidenav when content is rendered on mobile', () => {
    _isSmall$.next({ matches: true });
    fixture = TestBed.createComponent(RemoteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const ocSpy = jest.spyOn(component.drawer, 'close');
    lrasMock.rendered$.next(true);
    expect(ocSpy).toBeCalledTimes(1);
  });

  it('should open sidenav when button disappear', () => {
    _isSmall$.next({ matches: true });
    fixture = TestBed.createComponent(RemoteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const openDrawerSpy = jest.spyOn(component.drawer, 'open');
    fixture.debugElement
      .query(By.css('.sr-sidenav-toggle-btn'))
      .triggerEventHandler('@snBtnResizeOut.done', {
        fromState: 'whatever',
        phaseName: 'done',
        toState: 'void',
        totalTime: 0,
        triggerName: 'ocBtnSlideOutFromLeft',
      });
    expect(openDrawerSpy).toBeCalledTimes(1);
  });

  it('should re-show button after sidenav is closed', fakeAsync(() => {
    _isSmall$.next({ matches: true });
    fixture = TestBed.createComponent(RemoteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.drawer.open();

    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    flush();

    expect(
      fixture.debugElement.query(By.css('.sr-sidenav-toggle-btn'))
    ).toBeFalsy();

    component.drawer.close();

    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    flush();

    expect(
      fixture.debugElement.query(By.css('.sr-sidenav-toggle-btn'))
    ).toBeTruthy();
  }));

  it('should add material links to head', () => {
    fixture = TestBed.createComponent(RemoteEntryComponent);
    component = fixture.componentInstance;

    expect(
      fixture.nativeElement.ownerDocument.documentElement.querySelector(
        `link[href='${FONT_REF}']`
      )
    ).toBeTruthy();
    expect(
      fixture.nativeElement.ownerDocument.documentElement.querySelector(
        `link[href='${ICON_REF}']`
      )
    ).toBeTruthy();
    expect(
      fixture.nativeElement.ownerDocument.documentElement.querySelector(
        `link[href='${TEST_MAT_THEME_REF}']`
      )
    ).toBeTruthy();
  });
});
