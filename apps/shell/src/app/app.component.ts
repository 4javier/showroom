import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Component, Inject, InjectionToken } from '@angular/core';
import { LogoButtonComponent } from './logo-button/logo-button.component';
import { ShadowRoutingAnimationService } from '@showroom/shared/shadow-routing-animation';
import { filter, map, Observable, shareReplay } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { remoteUrls } from './app.remote-provider';

export const REMOTE_URLS = new InjectionToken<Record<string, string>>('remote_urls', {factory: () => ({...remoteUrls})});

@Component({
  standalone: true,
  imports: [RouterModule, AsyncPipe, NgIf, LogoButtonComponent],
  selector: 'showroom-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  activeRoute$: Observable<{url: string}>;

  constructor(
    @Inject(REMOTE_URLS) public remoteUrls: Record<string, string>,
    router: Router,
    private ras: ShadowRoutingAnimationService,
  ) {
    this.activeRoute$ = router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => ({url: e.url.split('/')[1]})),
      shareReplay()
    )
  }

  animateRouting(path: string) {
    this.ras.animateRouting(path)
  }
}
