import { Component } from '@angular/core';

import { ProfileComponent } from './features/profile/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileComponent],
  template: `<app-profile></app-profile>`,
  styles: []
})
export class AppComponent {
  title = 'github-profile-app';
}
