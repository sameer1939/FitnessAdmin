import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Login } from '../model/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.BaseUrl;
  constructor(private router: Router,private http:HttpClient) { }

  doLogin(login: Login) {
    return this.http.post(this.baseUrl+"account/login",login);

    // if (login.username == "admin" && login.password == "admin@123") {
    //   localStorage.setItem("username", "Admin");
    //   this.router.navigate(['admin/dashboard']);
    // }
    // else {
    //   alert("Wrong username and password");
    // }
  }

}
