import { ActivatedRoute, Router } from '@angular/router';
import { ShadowRoutingAnimationService } from './shadow-routing-animation.service';

const routerStub = {
  navigate: () => {
    return;
  },
} as unknown as Router;
const activatedRoute = new ActivatedRoute();
describe('ShadowRoutingAnimationService', () => {
  let service: ShadowRoutingAnimationService;
  it('should be created', () => {
    service = new ShadowRoutingAnimationService(routerStub, activatedRoute);
    expect(service).toBeTruthy();
  });

  it('should wait for area to be clear before starting navigation', () => {
    const routerSpy = jest.spyOn(routerStub, 'navigate');
    service = new ShadowRoutingAnimationService(routerStub, activatedRoute);
    service.animateRouting('somewhere');
    expect(routerSpy).toBeCalledTimes(0);
    service.clear$.next(true);
    expect(routerSpy).toBeCalledTimes(1);
  });
});
