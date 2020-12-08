import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(url: string) {
    return this.http.get(`${this.ROOT_URL}/${url}`)

  }

  post(url: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${url}`, payload)

  }

  patch(url: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${url}`, payload)

  }

  delete(url: string) {
    return this.http.delete(`${this.ROOT_URL}/${url}`)

  }

  login(email: string, password: string)
  {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      email,
      password
    }, {observe: 'response'
  });
  }

  updateUserProfile(_id: string, email: string, firstname: string, lastname: string, phone: string, unit: string, dues: string)
  {
    console.log("webservice");
    return this.http.put(`${this.ROOT_URL}/id`, {
      _id,
      email,
      firstname,
      lastname,
      phone,
      street: "tstr",
      city: "tCity",
      state: "tState",
      zipcode: "69001",
      dues,
      unit
    }, {
      observe: 'response'
    });
    console.log("works2");
  }

  updateUserDuesToPaid(email: string)
  {
    console.log("webservice");
    return this.http.put(`${this.ROOT_URL}/id`, {
      email,
      dues: "0"
    }, {
      observe: 'response'
    });
    console.log("works2");
  }

  signup(email: string, password: string, firstname: string, lastname: string, phone: string, unit: string) {
    return this.http.post(`${this.ROOT_URL}/users`, {
      email,
      firstname,
      lastname,
      phone,
      street: "testStreet",
      city: "testCity",
      state: "testState",
      zipcode: "testzip",
      password,
      isadmin: false,
      paidfor: true,
      dues: 0,
      unit
    }, {
        observe: 'response'
      });
  }
  

}
