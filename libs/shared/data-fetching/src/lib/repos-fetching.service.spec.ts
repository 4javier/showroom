import { HttpClient, HttpParams } from '@angular/common/http';
import { fakeAsync, flush, tick } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';

import {
  GH_API,
  GH_HOST,
  GH_USER,
  GL_API,
  GL_API_VERSION,
  GL_HOST,
  GL_USER,
  ReposFetchingService,
  REPO_TOPIC,
} from './repos-fetching.service';
import { GithubSerializedRepo, GitlabSerializedRepo, SlideData } from './model';

const httpMock = { get: () => of([]) } as unknown as HttpClient;
const httpSpy = jest.spyOn(httpMock, 'get');

const githubRepoStub1: GithubSerializedRepo = {
  description: 'gh_desc1',
  id: '1',
  name: 'gh_name1',
};
const githubRepoStub2: GithubSerializedRepo = {
  description: 'gh_desc2',
  id: '2',
  name: 'gh_name2',
};
const gitlabRepoStub1: GitlabSerializedRepo = {
  description: 'gl_desc1',
  id: '1',
  name: 'gl_name1',
  topics: [`${REPO_TOPIC}`, 'something_else'],
};
const gitlabRepoStub2: GitlabSerializedRepo = {
  description: 'gl_desc2',
  id: '2',
  name: 'gl_name2',
  topics: [`${REPO_TOPIC}`],
};
const otGitlabRepoStub1: GitlabSerializedRepo = {
  description: 'ot_gl_desc1',
  id: '1',
  name: 'ot_gl_name1',
  topics: ['something_else'],
};
const ghSlideStub1: SlideData = {
  title: 'gh_name1',
  content: 'gh_desc1',
  image: 'data:image/webp;base64,gh_img1',
  link: `${GH_HOST}/${GH_USER}/gh_name1`,
  origin: 'assets/github-badge.svg',
};
const ghSlideStub2: SlideData = {
  title: 'gh_name2',
  content: 'gh_desc2',
  image: 'data:image/webp;base64,gh_img2',
  link: `${GH_HOST}/${GH_USER}/gh_name2`,
  origin: 'assets/github-badge.svg',
};
const glSlideStub1: SlideData = {
  title: 'gl_name1',
  content: 'gl_desc1',
  image: 'data:image/webp;base64,gl_img1',
  link: `${GL_HOST}/${GL_USER}/gl_name1`,
  origin: 'assets/gitlab-badge.svg',
};
const glSlideStub2: SlideData = {
  title: 'gl_name2',
  content: 'gl_desc2',
  image: 'data:image/webp;base64,gl_img2',
  link: `${GL_HOST}/${GL_USER}/gl_name2`,
  origin: 'assets/gitlab-badge.svg',
};

describe('ReposFetchingService', () => {
  let service: ReposFetchingService;
  it('should be created', () => {
    service = new ReposFetchingService(httpMock);
    expect(service).toBeTruthy();
  });

  it('should call API with right parameters', () => {
    httpSpy.mockClear();
    service = new ReposFetchingService(httpMock);
    expect(httpSpy).toBeCalledTimes(2);
    expect(httpSpy).toHaveBeenCalledWith(`${GH_API}/search/repositories`, {
      params: new HttpParams({
        fromString: `q=user:${GH_USER} topic:${REPO_TOPIC}`,
      }),
    });
    expect(httpSpy).toHaveBeenCalledWith(
      `${GL_API}/${GL_API_VERSION}/users/${GL_USER}/projects`
    );
  });

  it('should filter by topic, combines and map projects to slides', fakeAsync(() => {
    httpSpy.mockImplementation((url) => {
      if (url.includes(`${GH_API}`)) {
        if (url.includes('/search/repositories'))
          return of({
            total_count: 2,
            items: [githubRepoStub1, githubRepoStub2],
          });
        if (url.includes('gh_name1')) return of({ content: 'gh_img1' });
        if (url.includes('gh_name2')) return of({ content: 'gh_img2' });
        else {
          return EMPTY;
        }
      } else if (url.includes(`${GL_API}`)) {
        if (url.includes(`${GL_USER}`))
          return of([gitlabRepoStub1, gitlabRepoStub2, otGitlabRepoStub1]);
        if (url.includes('projects/1')) return of({ content: 'gl_img1' });
        if (url.includes('projects/2')) return of({ content: 'gl_img2' });
        else {
          return EMPTY;
        }
      } else {
        return EMPTY;
      }
    });

    service = new ReposFetchingService(httpMock);
    tick();
    service.repoSlides$.subscribe((returned) =>
      expect(returned).toStrictEqual([
        ghSlideStub1,
        ghSlideStub2,
        glSlideStub1,
        glSlideStub2,
      ])
    );
    flush();
  }));
});
