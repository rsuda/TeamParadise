import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log("profile user");
    console.log(this.user);
  }

}
