import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'showroom-fe-mat-entry',
  template: `<showroom-nx-welcome></showroom-nx-welcome>`,
})
export class RemoteEntryComponent {}
