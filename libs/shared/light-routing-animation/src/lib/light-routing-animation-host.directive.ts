import { AnimationEvent } from '@angular/animations';
import { Directive, HostBinding, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router'
import { filter } from 'rxjs';
import { LightRoutingAnimationService } from './light-routing-animation.service';

@Directive({
  selector: '[sr-lra-host]',
  standalone: true
})
export class LightRoutingAnimationHostDirective {

  @HostBinding('@lightSlideLeftAnimation')
  animationTrigger = '';
  @HostListener('@lightSlideLeftAnimation.done', ['$event'])
  manageDoneCallback(event: AnimationEvent) {
    if(event.toState === 'leaving') {
      this.animationTrigger = 'entering'
    }
    else if(event.toState === 'entering') {
      this.lras.rendered$.next();
    }
  }
  
  constructor(
    router: Router,
    private lras: LightRoutingAnimationService
  ) {
    router.events.pipe(
      filter((e): e is NavigationStart => e instanceof NavigationStart),
    ).subscribe(() => this.animationTrigger = 'leaving');
  }

}
