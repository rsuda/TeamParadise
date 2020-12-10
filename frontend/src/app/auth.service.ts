import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean;
  user: any;
  userName: string;
  constructor(private webService: WebRequestService, private router: Router) { 
    this.loggedIn = false;
  }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("Logged in!");
        this.loggedIn = true;
        this.user = res.body;
        console.log(this.user);
      })
    )
  }

  signup(email: string, password: string, firstname: string, lastname: string, phone: string, unit: string) {
    return this.webService.signup(email, password, firstname, lastname, phone, unit).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("Successfully signed up and now logged in!");
      })
    )
  }

  getUser() {
    return this.user;
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }

  logout() {
    this.loggedIn = false;
    this.removeSession();
  }

  getName() {
    this.userName = this.user.firstname + " " + this.user.lastname;
    return this.userName;
  }
}
