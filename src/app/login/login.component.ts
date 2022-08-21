import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../model/ILogin';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { 
  }

  ngOnInit(): void {
  }

  doLogin(loginForm:NgForm){
    this.authService.doLogin(loginForm.value).subscribe((data:any)=>{
      localStorage.setItem("username", data.username);
      localStorage.setItem("token", data.token);
      this.router.navigate(['admin/dashboard']);
    });
  }
}
