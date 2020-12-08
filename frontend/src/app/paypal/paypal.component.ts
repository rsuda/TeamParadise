import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { WebRequestService } from '../web-request.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

declare var paypal;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  constructor(private authService: AuthService, private WebRequestService: WebRequestService, private router: Router){}
  product = {
    price: this.authService.user.dues,
    description: 'Pay your dues, ',
    img: 'assets/paradiseBeach.png'
  };

  user = {
    email: this.authService.user.email,
    firstname: this.authService.user.firstname,
    paidFor: this.authService.user.paidFor
  };

  //paidFor = false;

  ngOnInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.user.paidFor = true;
          console.log(order);
          this.product.price = "0";
          return this.WebRequestService.updateUserDuesToPaid(this.user.email).subscribe((res: HttpResponse<any>) => {
            console.log("update user");
            window.location.reload();
            this.router.navigate(['./paypal']);
          });
          
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
}