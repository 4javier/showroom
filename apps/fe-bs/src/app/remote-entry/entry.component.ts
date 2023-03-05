import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { RouterOutlet } from '@angular/router';
import { ShadowRoutingAnimationDirective, shadowSlideLeftAnimation } from '@showroom/shared/shadow-routing-animation'
import { LightRoutingAnimationHostDirective, lightSlideLeftAnimation } from '@showroom/shared/light-routing-animation'
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ocBtnSlideInFromLeft, ocBtnSlideOutFromLeft } from '../animations';
import { BehaviorSubject, map, merge } from 'rxjs';
import { AnimationEvent } from '@angular/animations';

@Component({
  standalone: true,
  imports: [
    CommonModule, RouterOutlet,
    ShadowRoutingAnimationDirective, LightRoutingAnimationHostDirective,
    NavListComponent
  ],
  selector: 'showroom-fe-bs-entry',
  templateUrl: 'remote-entry.component.html',
  styleUrls: ['remote-entry.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [
    shadowSlideLeftAnimation, lightSlideLeftAnimation,
    ocBtnSlideInFromLeft, ocBtnSlideOutFromLeft
  ],
  host: { 'style': 'display: block' }
})
export class RemoteEntryComponent {
  
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  hideButton$ = new BehaviorSubject<boolean>(false);
  showButton$ = this.hideButton$.pipe(map(v => !v));

  constructor(private offcanvasService: NgbOffcanvas) {}

	openSidenav() {
		const offcanvasRef = this.offcanvasService.open(NavListComponent,
      {
        container: this.container.nativeElement,
        scroll: true,
        panelClass: 'sr-offcanvas-panel'
      }
    );

    this.showButton$ = merge(
      this.hideButton$.pipe(map(() => false)),
      offcanvasRef.hidden.pipe(map(() => true))
    )

	}

  buttonGone(ev: AnimationEvent) {
    if(ev.toState === 'void') {
      this.openSidenav()
    }
  }

}