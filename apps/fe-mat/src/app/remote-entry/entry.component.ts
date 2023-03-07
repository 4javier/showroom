import { Component, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { RouterModule } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { ShadowRoutingAnimationDirective, shadowSlideLeftAnimation } from '@showroom/shared/shadow-routing-animation'
import { LightRoutingAnimationHostDirective, lightSlideLeftAnimation } from '@showroom/shared/light-routing-animation'
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { snBtnResizeIn, snBtnResizeOut } from '../animations';
import { AnimationEvent } from '@angular/animations';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    ShadowRoutingAnimationDirective, LightRoutingAnimationHostDirective,
    NavListComponent, MatSidenavModule, MatButtonModule, MatIconModule
  ],
  selector: 'showroom-fe-mat-entry',
  templateUrl: 'remote-entry.component.html',
  styleUrls: ['remote-entry.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [ MatIconRegistry ],
  animations: [
    shadowSlideLeftAnimation, lightSlideLeftAnimation,
    snBtnResizeIn, snBtnResizeOut
  ],
  host: { 'style': 'display: block' }
})
export class RemoteEntryComponent {

  @ViewChild('drawer') drawer!: MatDrawer;

  isSmall$: Observable<BreakpointState>;
  hideButton$ = new BehaviorSubject<boolean>(false);
  isButtonShown$ = this.hideButton$.pipe(
    map(v => !v),
    distinctUntilChanged()
  );
  vm$: Observable<{isSmall: BreakpointState; isButtonShown: boolean}>;
  
  constructor(
    renderer: Renderer2,
    breakpointObserver: BreakpointObserver,
    matIconRegistry: MatIconRegistry
  ) {

    addMaterialLinksToHead(renderer);
    matIconRegistry.setDefaultFontSetClass('material-symbols-outlined')

    this.isSmall$ = breakpointObserver.observe('(max-width: 991px)')
    this.vm$ = combineLatest({isSmall: this.isSmall$.pipe(), isButtonShown: this.isButtonShown$})
  }

  buttonGone(ev: AnimationEvent) {
    if(ev.fromState !== 'void' && ev.toState === 'void') {
      this.drawer.open()
    }
  }

}

const addMaterialLinksToHead = (renderer: Renderer2) => {
    const fontLink = renderer.createElement('link');
    const iconLink = renderer.createElement('link');

    renderer.setAttribute(
      fontLink,
      'href',
      'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap'
    );
    renderer.setAttribute(
      fontLink,
      'rel',
      'stylesheet'
    );

    renderer.setAttribute(
      iconLink,
      'href',
      'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined'
    );
    renderer.setAttribute(
      iconLink,
      'rel',
      'stylesheet'
    );

    renderer.appendChild(document.head, fontLink);
    renderer.appendChild(document.head, iconLink);
  }

