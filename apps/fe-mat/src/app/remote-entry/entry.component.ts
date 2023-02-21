import { Component, HostBinding, Inject, Renderer2, ViewEncapsulation } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { fromLeft } from '../animations';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NavListComponent, MatSidenavModule],
  selector: 'showroom-fe-mat-entry',
  templateUrl: 'remote-entry.component.html',
  styleUrls: ['remote-entry.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [fromLeft],
  host: { 'style': 'display: block' }
})
export class RemoteEntryComponent {
  @HostBinding('class.animate-from-left') animated = true;
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private renderer: Renderer2
  ) {
      const fontLink =  renderer.createElement('link');
      const iconLink =  renderer.createElement('link');
      
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
        'https://fonts.googleapis.com/icon?family=Material+Icons'
      );
      renderer.setAttribute(
        iconLink, 
        'rel',
        'stylesheet'
      );

      renderer.appendChild(document.head, fontLink);
      renderer.appendChild(document.head, iconLink);
  }
}
