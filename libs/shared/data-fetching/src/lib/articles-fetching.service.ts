import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, throwError, filter, shareReplay, concatAll, toArray } from 'rxjs';
import { DevtoSerializedArticle, SlideData } from './model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesFetchingService {

  DEV_TO_API = 'https://dev.to/api'
  DEV_TO_USER = 'gianpiero_errigo'

  devtoArticles$;

  constructor(private http: HttpClient) {

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
   }
}
