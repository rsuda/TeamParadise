import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { WebRequestService } from '../web-request.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: 
  {
    city: ""
    dues: ""
    email: ""
    firstname: ""
    isadmin: false
    lastname: ""
    paidfor: false
    phone: ""
    state: ""
    street: ""
    unit: ""
    zipcode: ""
    __v: 1
    _id: ""
  };

  constructor(private authService: AuthService, private webService: WebRequestService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log("profile user");
    console.log(this.user);
  }

  onSavedButtonClicked(email: string, firstname: string, lastname: string, phone: string, unit: string) {
    console.log(email);
    return this.webService.updateUserProfile(this.user._id ,email, firstname, lastname, phone, unit, this.user.dues).subscribe((res: HttpResponse<any>) => {
    console.log("update user");
    this.user = this.authService.getUser();
    this.ngOnInit();
    this.router.navigate(['./paypal']);
  });
}

}
