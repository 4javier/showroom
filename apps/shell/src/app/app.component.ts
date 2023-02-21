import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { LogoButtonComponent } from './logo-button/logo-button.component';
import { homeAnimationSequence } from './animations';

@Component({
  standalone: true,
  imports: [RouterModule, LogoButtonComponent],
  selector: 'showroom-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [homeAnimationSequence]
})
export class AppComponent {
  animState = '';
}
