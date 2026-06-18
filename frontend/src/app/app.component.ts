import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent {
  title = 'Mini Clinic Management';
  constructor(public authService: AuthService) {}
  logout() { this.authService.logout(); }
}
