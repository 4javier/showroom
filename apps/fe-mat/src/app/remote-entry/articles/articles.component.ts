import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesFetchingService } from '@showroom/shared/data-fetching';
import { SrMatCarouselComponent } from '../sr-mat-carousel/sr-mat-carousel.component';
import { fadeIn } from '../../animations';

@Component({
  selector: 'showroom-articles',
  standalone: true,
  imports: [CommonModule, SrMatCarouselComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  animations: [fadeIn]
})
export class ArticlesComponent {

  articleSlides$;
  constructor(fetcher: ArticlesFetchingService) {

    this.articleSlides$ = fetcher.devtoArticlesSlide$;
  }
}
