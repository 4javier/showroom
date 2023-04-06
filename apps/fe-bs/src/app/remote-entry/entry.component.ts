/* eslint-disable @angular-eslint/no-host-metadata-property */
import {
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { RouterOutlet } from '@angular/router';
import {
  ShadowRoutingAnimationDirective,
  shadowSlideLeftAnimation,
} from '@showroom/shared/shadow-routing-animation';
import {
  LightRoutingAnimationHostDirective,
  LightRoutingAnimationService,
  lightSlideLeftAnimation,
} from '@showroom/shared/light-routing-animation';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ocBtnSlideInFromLeft, ocBtnSlideOutFromLeft } from '../animations';
import {
  filter,
  map,
  ReplaySubject,
  startWith,
  Subject,
  takeUntil,
  withLatestFrom,
} from 'rxjs';
import { AnimationEvent } from '@angular/animations';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ShadowRoutingAnimationDirective,
    LightRoutingAnimationHostDirective,
    NavListComponent,
  ],
  selector: 'showroom-fe-bs-entry',
  templateUrl: 'remote-entry.component.html',
  styleUrls: ['remote-entry.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [LightRoutingAnimationService],
  animations: [
    shadowSlideLeftAnimation,
    lightSlideLeftAnimation,
    ocBtnSlideInFromLeft,
    ocBtnSlideOutFromLeft,
  ],
  host: { style: 'display: block' },
})
export class RemoteEntryComponent implements OnDestroy {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  hideButton$ = new Subject<boolean>();
  isButtonShown$ = this.hideButton$.pipe(
    startWith(false),
    map((v) => !v)
  );

  destroy$ = new ReplaySubject<void>();

  constructor(
    private offcanvasService: NgbOffcanvas,
    private lras: LightRoutingAnimationService,
    private injector: Injector
  ) {
    this.lras.rendered$
      .pipe(
        filter(Boolean),
        withLatestFrom(this.offcanvasService.activeInstance),
        map(([, offcanvas]) => offcanvas),
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe((offcanvas) => offcanvas.close());
  }

  openSidenav() {
    this.offcanvasService
      .open(NavListComponent, {
        container: this.container.nativeElement,
        scroll: true,
        panelClass: 'sr-offcanvas-panel',
        injector: this.injector
      })
      .hidden.subscribe(() => this.hideButton$.next(false));
  }

  buttonGone(ev: AnimationEvent) {
    if (ev.toState === 'void') {
      this.openSidenav();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
