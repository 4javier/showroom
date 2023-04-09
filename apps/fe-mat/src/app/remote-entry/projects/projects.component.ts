import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposFetchingService } from '@showroom/shared/data-fetching'
import { SrMatCarouselComponent } from '../sr-mat-carousel/sr-mat-carousel.component';
import { fadeIn } from '../../animations';

@Component({
  selector: 'showroom-projects',
  standalone: true,
  imports: [CommonModule, SrMatCarouselComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [fadeIn]
})
export class ProjectsComponent {

  repoSlides$;
  constructor(fetcher: ReposFetchingService) {
    
    this.repoSlides$ = fetcher.repoSlides$
  }
}
