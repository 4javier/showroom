import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, combineLatest, concatAll, concatMap, filter, map, Observable, of, retry, shareReplay, throwError, toArray } from 'rxjs';
import { GithubRepoDTO, GithubSerializedSearch, GitlabRepoDTO, GitlabSerializedRepo, SlideData } from './model';

const REPO_TOPIC = 'ge-showroom'

const GH_HOST = 'https://github.com'
const GH_API = 'https://api.github.com';
const GH_USER = '4javier';
const GH_API_VERSION = '2022-11-28';

const GL_HOST = 'https://gitlab.com'
const GL_API = 'https://gitlab.com/api';
const GL_USER = 'gianpiero.errigo';
const GL_API_VERSION = 'v4';

@Injectable({
  providedIn: 'root'
})
export class ReposFetchingService {

  githubRepos$: Observable<Array<GithubRepoDTO>>;
  gitlabRepos$: Observable<Array<GitlabRepoDTO>>;

  repoSlides$;

  constructor(private http: HttpClient) {

    this.githubRepos$ = http.get<GithubSerializedSearch>(
      `${GH_API}/search/repositories`,
      {
    //    headers: new HttpHeaders({'X-GitHub-Api-Version': this.GITHUB_API_VERSION, "Accept": "application/vnd.github+json"}),
        params: new HttpParams({fromString: `q=user:${GH_USER} topic:${REPO_TOPIC}`}),
      }
    ).pipe(
      retry(5),
      catchError(() => throwError(() => new Error('An error occurred while fetching repos from Github'))),
      map(search => search.items),
      concatAll(),
      map(repo => (
        {
          ...repo, 
          origin: 'github',
          imageUrl: `${GH_API}/repos/${GH_USER}/${repo.name}/contents/showroom_cover.webp`
        }
      )),
      toArray(),
      shareReplay(1)
    )

    this.gitlabRepos$ = http.get<Array<GitlabSerializedRepo>>(
      `${GL_API}/${GL_API_VERSION}/users/${GL_USER}/projects`
    ).pipe(
      retry(5),
      catchError(() => throwError(() => new Error('An error occurred while fetching repos from Gitlab'))),
      concatAll(),
      filter(repo => repo.topics.includes(`${REPO_TOPIC}`)),
      map(repo => (
        {
          ...repo, 
          origin: 'gitlab',
          imageUrl: `${GL_API}/${GL_API_VERSION}/projects/${repo.id}/repository/files/showroom_cover%2Ewebp?ref=master`
        }
      )),
      toArray(),
      shareReplay(1)
    )

    this.repoSlides$ = combineLatest([this.githubRepos$, this.gitlabRepos$]).pipe(
      map(([githubRepos, gitlabRepos]) => [...githubRepos, ...gitlabRepos]),
      concatAll(),
      concatMap(repo => mapRepoToSlide(repo)),
      toArray()      
    )

    const mapRepoToSlide = (repo: GithubRepoDTO | GitlabRepoDTO): Observable<SlideData> => {
      return this.http.get<{content: string}>(repo.imageUrl).pipe(
        catchError(() => of({content: ''})),

        map(imageJson => (
          {
            title: repo.name,
            content: repo.description,
            image: `data:image/webp;base64,${imageJson.content}`,
            link: repo.origin === 'github' ? `${GH_HOST}/${GH_USER}/${repo.name}` :
                  repo.origin === 'gitlab' ? `${GL_HOST}/${GL_USER}/${repo.name}` : 
                  'no_link',
            origin: repo.origin === 'github' ? 'assets/github-badge.svg' :
                    repo.origin === 'gitlab' ? 'assets/gitlab-badge.svg' :
                    'no_logo'
          }
        ))
      )
    }
  }


}
