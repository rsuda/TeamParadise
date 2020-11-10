import { Component } from '@angular/core';
import { AuthService } from './auth.service';

declare var paypal;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'paradise';
  loggedIn: boolean;
  constructor(public authService: AuthService)
  {
    this.loggedIn = authService.loggedIn;
  }
}
