import { TestBed } from '@angular/core/testing';

import { ReposFetchingService } from './repos-fetching.service';

describe('ReposFetchingService', () => {
  let service: ReposFetchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReposFetchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
