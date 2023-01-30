import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry, shareReplay, throwError } from 'rxjs';

export interface GithubSerializedSearch{
  total_count: number;
  items: [
    {
      name: string;
      description: string;
    }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class ReposFetchingService {

  REPO_TOPIC = 'ge-showroom'

  GITHUB_API = 'https://api.github.com';
  GITHUB_USER = '4javier';
  GITHUB_API_VERSION = '2022-11-28';
  
  githubProjects$;
  constructor(private http: HttpClient) {

    this.githubProjects$ = http.get<GithubSerializedSearch>(
      `${this.GITHUB_API}/search/repositories`,
      {
    //    headers: new HttpHeaders({'X-GitHub-Api-Version': this.GITHUB_API_VERSION, "Accept": "application/vnd.github+json"}),
        params: new HttpParams({fromString: `q=user:${this.GITHUB_USER} topic:${this.REPO_TOPIC}`}),
      }
    ).pipe(
      retry(5),
      catchError(() => throwError(() => new Error('An error occurred while fetching repos from Github'))),
      shareReplay(1)
    )
  }
}
