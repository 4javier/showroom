import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesFetchingService } from '@showroom/shared/data-fetching';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'showroom-articles',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {

  articleSlides;
  constructor(private fetcher: ArticlesFetchingService) {

    this.articleSlides = fetcher.devtoArticlesSlide$;
  }
}
