import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesFetchingService } from '@showroom/shared/data-fetching';
import { BsCarouselComponent } from '../bs-carousel/bs-carousel.component';

@Component({
  selector: 'showroom-articles',
  standalone: true,
  imports: [CommonModule, BsCarouselComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {

  articleSlides$;
  constructor(fetcher: ArticlesFetchingService) {

    this.articleSlides$ = fetcher.devtoArticlesSlide$;
  }
}
