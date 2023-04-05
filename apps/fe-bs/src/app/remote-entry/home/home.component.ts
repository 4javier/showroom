import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SrBsTileComponent } from '../sr-bs-tile/sr-bs-tile.component';

@Component({
  selector: 'showroom-home',
  standalone: true,
  imports: [CommonModule, SrBsTileComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
