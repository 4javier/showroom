import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { LogoButtonComponent } from './logo-button/logo-button.component';

@Component({
  standalone: true,
  imports: [RouterModule, LogoButtonComponent],
  selector: 'showroom-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';
}
