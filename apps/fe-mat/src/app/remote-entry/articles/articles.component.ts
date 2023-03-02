import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesFetchingService } from '@showroom/shared/data-fetching';
import { CarouselComponent } from '../carousel/carousel.component';
import { fadeIn } from '../../animations';

@Component({
  selector: 'showroom-articles',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
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
