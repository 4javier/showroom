import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ReposFetchingService } from '@showroom/shared/data-fetching';
import { ReplaySubject } from 'rxjs';

import { ProjectsComponent } from './projects.component';

const repoFetchServMock = { repoSlides$: new ReplaySubject() };

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ReposFetchingService, useValue: repoFetchServMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start showing loading template', () => {
    expect(fixture.debugElement.queryAll(By.css('#placeholder'))).toHaveLength(1);
    expect(fixture.debugElement.queryAll(By.css('showroom-mat-carousel'))).toHaveLength(1);
  });

  it('should show carousel on fetcher emission', () => {
    repoFetchServMock.repoSlides$.next(['whatever']);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('#placeholder'))).toHaveLength(0);
    expect(fixture.debugElement.queryAll(By.css('showroom-mat-carousel'))).toHaveLength(1);
  });
});
