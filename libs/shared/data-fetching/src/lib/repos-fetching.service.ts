import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, concatAll, filter, map, retry, shareReplay, throwError, toArray } from 'rxjs';

export interface GithubSerializedSearch{
  total_count: number;
  items: GithubSerializedRepo[]
}

export interface GithubSerializedRepo {
  name: string;
  description: string;
}

export interface GitlabSerializedRepo{
  name: string;
  description: string;
  topics: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ReposFetchingService {

  REPO_TOPIC = 'ge-showroom'

  GITHUB_API = 'https://api.github.com';
  GITHUB_USER = '4javier';
  GITHUB_API_VERSION = '2022-11-28';

  GITLAB_API = 'https://gitlab.com/api';
  GITLAB_USER = 'gianpiero.errigo';
  GITLAB_API_VERSION = 'v4';
  
  githubProjects$;
  gitlabProjects$;

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
      map(search => search.items),
      shareReplay(1)
    )

    this.gitlabProjects$ = http.get<Array<GitlabSerializedRepo>>(
      `${this.GITLAB_API}/${this.GITLAB_API_VERSION}/users/${this.GITLAB_USER}/projects`
    ).pipe(
      retry(5),
      catchError(() => throwError(() => new Error('An error occurred while fetching repos from Gitlab'))),
      concatAll(),
      filter(project => project.topics.includes('ge-showroom')),
      toArray(),
      shareReplay(1)
    )
  }
}
