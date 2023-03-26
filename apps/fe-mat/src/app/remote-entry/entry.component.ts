import {
  AfterViewInit,
  Component,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { RouterModule } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import {
  ShadowRoutingAnimationDirective,
  shadowSlideLeftAnimation,
} from '@showroom/shared/shadow-routing-animation';
import {
  LightRoutingAnimationHostDirective,
  LightRoutingAnimationService,
  lightSlideLeftAnimation,
} from '@showroom/shared/light-routing-animation';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  withLatestFrom,
} from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { snBtnResizeIn, snBtnResizeOut } from '../animations';
import { AnimationEvent } from '@angular/animations';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

export const FONT_REF =
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap';
export const ICON_REF =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined';
export const TEST_MAT_THEME_REF =
  'data:text/css;charset=UTF-8,' +
  encodeURIComponent(`.mat-theme-loaded-marker {display: none}`);

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ShadowRoutingAnimationDirective,
    LightRoutingAnimationHostDirective,
    NavListComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
  ],
  selector: 'showroom-fe-mat-entry',
  templateUrl: 'remote-entry.component.html',
  styleUrls: ['remote-entry.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [MatIconRegistry, LightRoutingAnimationService],
  animations: [
    shadowSlideLeftAnimation,
    lightSlideLeftAnimation,
    snBtnResizeIn,
    snBtnResizeOut,
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { style: 'display: block' },
})
export class RemoteEntryComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  isSmall$: Observable<boolean>;
  hideButton$ = new BehaviorSubject<boolean>(false);
  isButtonShown$ = this.hideButton$.pipe(
    map((v) => !v),
    distinctUntilChanged()
  );
  vm$: Observable<{ isSmall: boolean; isButtonShown: boolean }>;

  constructor(
    private renderer: Renderer2,
    breakpointObserver: BreakpointObserver,
    matIconRegistry: MatIconRegistry,
    private lras: LightRoutingAnimationService
  ) {
    this.addMaterialLinksToHead();
    matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');

    this.isSmall$ = breakpointObserver
      .observe('(max-width: 991px)')
      .pipe(map((isSmall) => isSmall.matches));

    this.vm$ = combineLatest({
      isSmall: this.isSmall$,
      isButtonShown: this.isButtonShown$,
    });
  }

  ngAfterViewInit(): void {
    this.lras.rendered$
      .pipe(
        filter(Boolean),
        withLatestFrom(this.isSmall$),
        filter(([, isSmall]) => isSmall)
      )
      .subscribe(() => this.drawer.close());
  }

  buttonGone(ev: AnimationEvent) {
    if (ev.fromState !== 'void' && ev.toState === 'void') {
      this.drawer.open();
    }
  }

  addMaterialLinksToHead = () => {
    const fontLink = this.renderer.createElement('link');
    const iconLink = this.renderer.createElement('link');
    const testMatThemeLink = this.renderer.createElement('link');

    this.renderer.setAttribute(fontLink, 'href', FONT_REF);
    this.renderer.setAttribute(fontLink, 'rel', 'stylesheet');

    this.renderer.setAttribute(iconLink, 'href', ICON_REF);
    this.renderer.setAttribute(iconLink, 'rel', 'stylesheet');

    this.renderer.setAttribute(testMatThemeLink, 'href', TEST_MAT_THEME_REF);
    this.renderer.setAttribute(testMatThemeLink, 'rel', 'stylesheet');

    this.renderer.appendChild(document.head, fontLink);
    this.renderer.appendChild(document.head, iconLink);
    this.renderer.appendChild(document.head, testMatThemeLink);
  };
}
