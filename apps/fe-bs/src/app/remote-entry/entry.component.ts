import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { RouterOutlet } from '@angular/router';
import { ShadowRoutingAnimationDirective, shadowSlideLeftAnimation } from '@showroom/shared/shadow-routing-animation'
import { LightRoutingAnimationHostDirective, lightSlideLeftAnimation } from '@showroom/shared/light-routing-animation'
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

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
  animations: [shadowSlideLeftAnimation, lightSlideLeftAnimation],
  host: { 'style': 'display: block' }
})
export class RemoteEntryComponent {
  
  @ViewChild('mainRow') mainRow!: ElementRef<HTMLDivElement>;
  constructor(
    private hostElement: ElementRef,
    private offcanvasService: NgbOffcanvas) {}

	openSidenav() {
		this.offcanvasService.open(NavListComponent,
       {
        container: this.mainRow.nativeElement,
        scroll: true,
        panelClass: 'sr-offcanvas-panel'
      });
	}

}