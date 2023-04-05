import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Event, NavigationEnd, NavigationStart } from '@angular/router';
import { NavListComponent } from './nav-list.component';
import { TestScheduler } from 'rxjs/testing';
import { ReplaySubject } from 'rxjs';

describe('NavListComponent', () => {
  let component: NavListComponent;
  let fixture: ComponentFixture<NavListComponent>;
  let testScheduler: TestScheduler;
  let _events$: ReplaySubject<Event>;

  beforeEach(async () => {
    _events$ = new ReplaySubject(1);
    const routerMock = { events: _events$, url: '/' } as unknown as Router;

    await TestBed.configureTestingModule({
      imports: [NavListComponent],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    testScheduler = new TestScheduler((actual, expected) => {
      return expect(actual).toEqual(expected);
    });
    fixture = TestBed.createComponent(NavListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should detect home as active route in remote mode`, () => {
    const navStart = new NavigationStart(1, '/fe-bs/home');
    const navEnd = new NavigationEnd(1, '/fe-bs/home', '/fe-bs/home');
    _events$.next(navStart);
    _events$.next(navEnd);

    testScheduler.run(({ expectObservable }) => {
      expectObservable(component.activeRoute$).toBe('(ab)', {
        a: '',
        b: 'home',
      });
    });
  });

  it(`should detect home as active route in standalone mode`, () => {
    const navStart = new NavigationStart(1, '/home');
    const navEnd = new NavigationEnd(1, '/home', '/home');
    _events$.next(navStart);
    _events$.next(navEnd);

    testScheduler.run(({ expectObservable }) => {
      expectObservable(component.activeRoute$).toBe('(ab)', {
        a: '',
        b: 'home',
      });
    });
  });

  it(`should detect articles as active route in remote mode`, () => {
    const navStart = new NavigationStart(1, '/fe-bs/articles');
    const navEnd = new NavigationEnd(1, '/fe-bs/articles', '/fe-bs/articles');
    _events$.next(navStart);
    _events$.next(navEnd);

    testScheduler.run(({ expectObservable }) => {
      expectObservable(component.activeRoute$).toBe('(ab)', {
        a: '',
        b: 'articles',
      });
    });
  });

  it(`should detect articles as active route in standalone mode`, () => {
    const navStart = new NavigationStart(1, '/articles');
    const navEnd = new NavigationEnd(1, '/articles', '/articles');
    _events$.next(navStart);
    _events$.next(navEnd);

    testScheduler.run(({ expectObservable }) => {
      expectObservable(component.activeRoute$).toBe('(ab)', {
        a: '',
        b: 'articles',
      });
    });
  });

  it(`should detect projects as active route in remote mode`, () => {
    const navStart = new NavigationStart(1, '/fe-bs/projects');
    const navEnd = new NavigationEnd(1, '/fe-bs/projects', '/fe-bs/projects');
    _events$.next(navStart);
    _events$.next(navEnd);

    testScheduler.run(({ expectObservable }) => {
      expectObservable(component.activeRoute$).toBe('(ab)', {
        a: '',
        b: 'projects',
      });
    });
  });

  it(`should detect projects as active route in standalone mode`, () => {
    const navStart = new NavigationStart(1, '/projects');
    const navEnd = new NavigationEnd(1, '/projects', '/projects');
    _events$.next(navStart);
    _events$.next(navEnd);

    testScheduler.run(({ expectObservable }) => {
      expectObservable(component.activeRoute$).toBe('(ab)', {
        a: '',
        b: 'projects',
      });
    });
  });
});
