import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private router:Router) { }

doLogin(login:Login){
  if(login.username=="admin" && login.password=="admin@123"){
    localStorage.setItem("username","Admin");
    this.router.navigate(['admin/dashboard']);
  }
  else{
    alert("Wrong username and password");
  }
}

}
