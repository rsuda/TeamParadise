import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private authService: AuthService) {}

    ngOnInit() {

    }

    onLoginButtonClicked(email: string, password: string) {
        this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
            console.log(res);
        });
    }

}