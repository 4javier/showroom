import { TestBed } from '@angular/core/testing';

import { LightRoutingAnimationService } from './light-routing-animation.service';

describe('LightRoutingAnimationService', () => {
  let service: LightRoutingAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightRoutingAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
