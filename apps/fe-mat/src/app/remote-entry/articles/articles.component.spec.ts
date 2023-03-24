import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ArticlesFetchingService } from '@showroom/shared/data-fetching';
import { ReplaySubject } from 'rxjs';

import { ArticlesComponent } from './articles.component';

const artFetchServMock = { devtoArticlesSlide$: new ReplaySubject() };

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ArticlesFetchingService, useValue: artFetchServMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesComponent);
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
    artFetchServMock.devtoArticlesSlide$.next(['whatever']);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('#placeholder'))).toHaveLength(0);
    expect(fixture.debugElement.queryAll(By.css('showroom-mat-carousel'))).toHaveLength(1);
  });
});
