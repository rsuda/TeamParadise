import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    user: any;
    loggedIn: boolean;

    constructor(private authService: AuthService, private router: Router) {
        this.loggedIn = false;
    }

    ngOnInit() {
        
    }

    /**onLoginButtonClicked(email: string, password: string) {
        this.authService.login(email, password).subscribe((user: any) => {
            console.log(user);
            console.log(user.street);
            this.route.params.subscribe(
                (params: Params) => {
                    console.log(params);
                }
            )
            this.authService.login(email, password).subscribe((user: any) => {
                this.user = user;
                console.log(user.body.email);
            })
        });
    }*/

    /**onLoginButtonClicked(email: string, password: string) {
        this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
            console.log(res);
            if (res.status === 200) {
                this.router.navigate(['./paypal']);
                this.validLogin = true;
                this.user = res.body;
                console.log(this.user.email);
            }
            else if (res.status === 400){
                this.validLogin = false;
            }
        });
    }
    */

   onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        if (res.status === 200) {
            this.router.navigate(['./paypal']);
            this.user = res.body;
            console.log(this.user);
            this.loggedIn = true;
        }
    });
}

//email.value, firstname.value, lastname.value, phone.value, unit.value, password.value
onSignupButtonClicked(email: string, firstname: string, lastname: string, phone: string, unit: string, password: string) {
    this.authService.signup(email, password, firstname, lastname, phone, unit).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.router.navigate(['./paypal']);
      this.loggedIn = true;
      this.onLoginButtonClicked(email, password);
    });
  }

}