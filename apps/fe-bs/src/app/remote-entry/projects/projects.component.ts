import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposFetchingService } from '@showroom/shared/data-fetching';
import { BsCarouselComponent } from '../bs-carousel/bs-carousel.component';

@Component({
  selector: 'showroom-projects',
  standalone: true,
  imports: [CommonModule, BsCarouselComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {

  repoSlides$;
  constructor(fetcher: ReposFetchingService) {
    
    this.repoSlides$ = fetcher.repoSlides$
  }
}
