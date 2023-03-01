import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, throwError, filter, shareReplay, concatAll, toArray, map } from 'rxjs';
import { DevtoSerializedArticle, SlideData } from './model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesFetchingService {

  DEV_TO_API = 'https://dev.to/api'
  DEV_TO_USER = 'gianpiero_errigo'

  devtoArticles$;
  devtoArticlesSlide$;

  constructor(http: HttpClient) {

    this.devtoArticles$ = http.get<Array<DevtoSerializedArticle>>(
      `${this.DEV_TO_API}/articles`,
      {
        params: new HttpParams({fromObject: {username: this.DEV_TO_USER}}),
      }
    ).pipe(
      retry(5),
      catchError(() => throwError(() => new Error('An error occurred while fetching articles from DevTo'))),
      concatAll(),
      filter(article => article.type_of === 'article'),
      toArray(), 
      shareReplay(1)
    )

    this.devtoArticlesSlide$ = this.devtoArticles$.pipe(
      concatAll(),
      map(article => mapDevtoArticleToSlide(article)),
      toArray()      
    )

   }

}

const mapDevtoArticleToSlide = (article: DevtoSerializedArticle): SlideData => {
  return {
    title: article.title,
    subtitle: article.organization?.name,
    content: article.description,
    image: article.cover_image,
    link: article.canonical_url,
    origin: "assets/devto-badge.svg"

  }
}
