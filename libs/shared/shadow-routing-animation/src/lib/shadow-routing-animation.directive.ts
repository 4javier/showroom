import { AnimationEvent } from '@angular/animations';
import { Directive, HostBinding, HostListener } from '@angular/core';
import { ShadowRoutingAnimationService } from './shadow-routing-animation.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[sr-sra]',
  standalone: true,
})
export class ShadowRoutingAnimationDirective {
  @HostBinding('@slideLeftAnimation')
  animationTrigger = 'in';
  @HostListener('@slideLeftAnimation.done', ['$event'])
  markAsClear(event: AnimationEvent) {
    this.ras.markAsClear(event);
  }
  @HostListener('@slideLeftAnimation.start', ['$event'])
  markAsDirty(event: AnimationEvent) {
    this.ras.markAsDirty(event);
  }

  constructor(private ras: ShadowRoutingAnimationService) {
    ras.slide$.subscribe(
      (slideTrigger) => (this.animationTrigger = slideTrigger)
    );
  }
}
