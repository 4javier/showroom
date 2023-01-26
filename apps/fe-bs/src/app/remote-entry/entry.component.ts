import { Component, Inject, Renderer2, ViewEncapsulation } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NavListComponent } from './nav-list/nav-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, NavListComponent, RouterOutlet ],
  selector: 'showroom-fe-bs-entry',
  templateUrl: 'remote-entry.component.html',
  styleUrls: ['remote-entry.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class RemoteEntryComponent {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private renderer: Renderer2) {
      const iconLink =  renderer.createElement('link');

      renderer.setAttribute(
        iconLink, 
        'href', 
        'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css'
      );
      renderer.setAttribute(
        iconLink, 
        'rel',
        'stylesheet'
      );

      renderer.appendChild(document.head, iconLink);
  }
}