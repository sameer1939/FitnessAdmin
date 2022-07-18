import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from '../model/ILogin';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) { 
  }

  ngOnInit(): void {
  }

  doLogin(loginForm:NgForm){
    this.authService.doLogin(loginForm.value);
  }
}
