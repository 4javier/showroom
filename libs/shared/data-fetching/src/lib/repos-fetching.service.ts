import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, combineLatest, concatAll, filter, map, Observable, retry, shareReplay, throwError, toArray } from 'rxjs';
import { GithubRepoDTO, GithubSerializedSearch, GitlabRepoDto, GitlabSerializedRepo, SlideData } from './model';

@Injectable({
  providedIn: 'root'
})
export class ReposFetchingService {

  REPO_TOPIC = 'ge-showroom'

  GITHUB_HOST = 'https://github.com'
  GITHUB_API = 'https://api.github.com';
  GITHUB_USER = '4javier';
  GITHUB_API_VERSION = '2022-11-28';

  GITLAB_HOST = 'https://gitlab.com'
  GITLAB_API = 'https://gitlab.com/api';
  GITLAB_USER = 'gianpiero.errigo';
  GITLAB_API_VERSION = 'v4';
  
  githubRepos$: Observable<Array<GithubRepoDTO>>;
  gitlabRepos$: Observable<Array<GitlabRepoDto>>;

  repoSlide$;

  constructor(private http: HttpClient) {

    this.githubRepos$ = http.get<GithubSerializedSearch>(
      `${this.GITHUB_API}/search/repositories`,
      {
    //    headers: new HttpHeaders({'X-GitHub-Api-Version': this.GITHUB_API_VERSION, "Accept": "application/vnd.github+json"}),
        params: new HttpParams({fromString: `q=user:${this.GITHUB_USER} topic:${this.REPO_TOPIC}`}),
      }
    ).pipe(
      retry(5),
      catchError(() => throwError(() => new Error('An error occurred while fetching repos from Github'))),
      map(search => search.items),
      concatAll(),
      map(repo => ({...repo, origin: 'github'})),
      toArray(),
      shareReplay(1)
    )

    this.gitlabRepos$ = http.get<Array<GitlabSerializedRepo>>(
      `${this.GITLAB_API}/${this.GITLAB_API_VERSION}/users/${this.GITLAB_USER}/projects`
    ).pipe(
      retry(5),
      catchError(() => throwError(() => new Error('An error occurred while fetching repos from Gitlab'))),
      concatAll(),
      filter(repo => repo.topics.includes('ge-showroom')),
      map(repo => ({...repo, origin: 'gitlab'})),
      toArray(),
      shareReplay(1)
    )

    this.repoSlide$ = combineLatest([this.githubRepos$, this.gitlabRepos$]).pipe(
      map(([githubRepos, gitlabRepos]) => [...githubRepos, ...gitlabRepos]),
      concatAll(),
      map(repo => mapRepoToSlide(repo)),
      toArray()      
    )

    const mapRepoToSlide = (repo: GithubRepoDTO | GitlabRepoDto): SlideData => {
      return {
        title: repo.name,
        content: repo.description,
        image: fetchRepoCover(repo),
        link: repo.origin === 'github' ? `${this.GITHUB_HOST}/${this.GITHUB_USER}/${repo.name}` :
              repo.origin === 'gitlab' ? `${this.GITLAB_HOST}/${this.GITLAB_USER}/${repo.name}` : 
              'no_link',
        origin: repo.origin === 'github' ? 'github_logo' :
                repo.origin === 'gitlab' ? 'gitlab_logo' :
                'no_logo'
      }
    }
  }

}

const fetchRepoCover = (repo: GithubRepoDTO | GitlabRepoDto): string => {
  return('Function fetchRepoCover not implemented.');
}
