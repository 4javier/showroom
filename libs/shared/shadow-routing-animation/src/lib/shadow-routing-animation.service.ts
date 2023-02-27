import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, ReplaySubject, shareReplay, switchMap, tap } from 'rxjs';
import { AnimationEvent }from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ShadowRoutingAnimationService {

  public _slide$ = new BehaviorSubject<'in'|'out'>('in');
  public slide$ = this._slide$.pipe(shareReplay())
  public clear$ = new BehaviorSubject<boolean>(false)
  private path$ = new ReplaySubject<string>(1);
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.clear$.pipe(
      switchMap(v => v ? this.path$ : EMPTY ),
      tap((path) => 
        this.router.navigate([path], {relativeTo: this.route}).then(() => this._slide$.next('in'))
      )
    ).subscribe()
  }

  animateRouting(path: string) {
    this._slide$.next('out');
    this.path$.next(path);
  }

  markAsClear(ev: AnimationEvent) {
    if(ev.triggerName === 'slideLeftAnimation' 
        && ev.phaseName === 'done' 
        && ev.fromState === 'in'
        && ev.toState === 'out') {
      this.clear$.next(true)
    }
  }

  markAsDirty(ev: AnimationEvent) {
    if(ev.triggerName === 'slideLeftAnimation' 
        && ev.phaseName === 'start' 
        && ev.fromState === 'void'
        && ev.toState === 'in') {
      this.clear$.next(false)
    }
  }

}
