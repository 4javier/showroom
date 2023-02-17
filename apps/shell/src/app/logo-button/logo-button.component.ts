import { Attribute, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'showroom-logo-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-button.component.html',
  styleUrls: ['./logo-button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LogoButtonComponent {

  constructor(
    private hostEl: ElementRef,
    @Attribute('size') size: string
  ) {
    this.hostEl.nativeElement.style.setProperty('--sr-logo-button-size', size)
  }
}
