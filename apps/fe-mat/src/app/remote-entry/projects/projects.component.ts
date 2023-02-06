import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposFetchingService, ArticlesFetchingService } from '@showroom/shared/data-fetching'
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'showroom-projects',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {

  repoSlides;
  constructor(private fetcher: ReposFetchingService) {
    
    this.repoSlides = fetcher.repoSlides$
  }
}
