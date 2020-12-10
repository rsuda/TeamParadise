import { Component, OnInit} from '@angular/core';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

declare var paypal;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'paradise';
  loggedIn: boolean;
  private cookieValue: string;
  constructor(public authService: AuthService, private cookieService: CookieService)
  {
    this.loggedIn = authService.loggedIn;

  }

  public ngOnInit() {
    this.cookieService.set('cookie-name', 'our cookie value');
    this.cookieValue = this.cookieService.get('cookie-name');
  }

}
