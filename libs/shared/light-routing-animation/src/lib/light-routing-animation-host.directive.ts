import { Directive, HostBinding, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router'
import { filter } from 'rxjs';

@Directive({
  selector: '[sr-lra-host]',
  standalone: true
})
export class LightRoutingAnimationHostDirective {

  @HostBinding('@lightSlideLeftAnimation')
  animationTrigger = '';
  @HostListener('@lightSlideLeftAnimation.done')
  startEntering() {
    this.animationTrigger = 'entering'
  }
  
  constructor(private router: Router) {
    router.events.pipe(
      filter((e): e is NavigationStart => e instanceof NavigationStart),
    ).subscribe(() => this.animationTrigger = 'leaving');
  }

}
