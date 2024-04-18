import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/Shared/Services/auth.service';
import { Login } from 'src/Models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginData: Login = {id:0, email:"", senha:""}

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    if (this.loginData.email && this.loginData.senha) {
      this.auth.login(this.loginData.email, this.loginData.senha);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  deslogar() {
    this.auth.logout();
  }

}
