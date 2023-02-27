import { Attribute, Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
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

  @HostBinding('class.activating') @Input() activating = false;
  private _activated = false;
  @HostBinding('class.activated') @Input() get activated() {return this._activated};
  set activated(activated: boolean) {
    this._activated = activated;
    activated ? this.activating = false : null;
  }
  
  constructor(
    private hostEl: ElementRef,
    @Attribute('size') size: string
  ) {
    this.hostEl.nativeElement.style.setProperty('--sr-logo-button-size', size)
  }
}
