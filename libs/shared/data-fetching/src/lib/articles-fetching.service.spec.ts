import { TestBed } from '@angular/core/testing';

import { ArticlesFetchingService } from './articles-fetching.service';

describe('ArticlesFetchingService', () => {
  let service: ArticlesFetchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesFetchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
