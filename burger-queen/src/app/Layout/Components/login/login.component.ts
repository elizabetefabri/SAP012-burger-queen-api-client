import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/Shared/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {

  }

  onLogin(): void {
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('====================================');
        console.log("Login realizado com Sucesso", response);
        console.log('====================================');
      },
      error: (error) => {
        console.error("Seu Login Falhou 💣", error);
      }
    })
  }



}
