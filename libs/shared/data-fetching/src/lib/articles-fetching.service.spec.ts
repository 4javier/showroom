import { HttpClient, HttpParams } from '@angular/common/http';
import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { ArticlesFetchingService } from './articles-fetching.service';
import { DevtoSerializedArticle, SlideData } from './model';

const httpMock = { get: () => of([]) } as unknown as HttpClient;
const httpSpy = jest.spyOn(httpMock, 'get');

const devtoArticleStub1: DevtoSerializedArticle = {
  canonical_url: 'url1',
  cover_image: 'img1',
  description: 'desc1',
  title: 'title1',
  type_of: 'article',
};
const devtoArticleStub2: DevtoSerializedArticle = {
  canonical_url: 'url2',
  cover_image: 'img2',
  description: 'desc2',
  title: 'title2',
  type_of: 'article',
  organization: { name: 'org2' },
};
const notArticleStub1: DevtoSerializedArticle = {
  canonical_url: 'url1',
  cover_image: 'img1',
  description: 'desc1',
  title: 'title1',
  type_of: 'not_article',
};
const slideStub1: SlideData = {
  title: 'title1',
  content: 'desc1',
  image: 'img1',
  link: 'url1',
  origin: 'assets/devto-badge.svg',
  subtitle: undefined
};
const slideStub2: SlideData = {
  title: 'title2',
  content: 'desc2',
  image: 'img2',
  link: 'url2',
  origin: 'assets/devto-badge.svg',
  subtitle: 'org2',
};

describe('ArticlesFetchingService', () => {
  let service: ArticlesFetchingService;
  it('should be created', () => {
    service = new ArticlesFetchingService(httpMock);
    expect(service).toBeTruthy();
  });

  it('should call API with right parameters', () => {
    service = new ArticlesFetchingService(httpMock);
    expect(httpSpy).toHaveBeenCalledWith(`${service.DEV_TO_API}/articles`, {
      params: new HttpParams({ fromObject: { username: service.DEV_TO_USER } }),
    });
  });

  it('should filter articles and map them to slides', fakeAsync(() => {
    httpSpy.mockReturnValue(
      of([devtoArticleStub1, devtoArticleStub2, notArticleStub1])
    );
    service = new ArticlesFetchingService(httpMock);
    tick();
    service.devtoArticlesSlide$.subscribe((returned) =>
      expect(returned).toStrictEqual([slideStub1, slideStub2])
    );
    discardPeriodicTasks();
  }));

});
