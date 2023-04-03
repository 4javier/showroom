import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'showroom-mat-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sr-mat-tile.component.html',
  styleUrls: ['./sr-mat-tile.component.scss'],
})
export class SrMatTileComponent {
  isSmall$: Observable<{ isSmall: boolean }>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.isSmall$ = breakpointObserver
      .observe('(max-width: 991px)')
      .pipe(map((isSmall) => ({ isSmall: isSmall.matches })));
  }
}
