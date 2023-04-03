import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { SrMatTileComponent } from '../sr-mat-tile/sr-mat-tile.component';
import { map, Observable, startWith } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'showroom-home',
  standalone: true,
  imports: [CommonModule, MatGridListModule, SrMatTileComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  bp$: Observable<{ isSmall: boolean }>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.bp$ = breakpointObserver.observe('(max-width: 991px)').pipe(
      map((isSmall) => ({ isSmall: isSmall.matches })),
      startWith({ isSmall: false })
    );
  }
}
