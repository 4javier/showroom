import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'showroom-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {}
