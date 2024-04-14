import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/Shared/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log("Login realizado com Sucesso", response);
        // Verifica se o usuário está logado
        if (response.loggedIn) {
          console.log("Usuário logado com sucesso!");
          // Redireciona para a página de registrar mesa
          this.router.navigate(['/registrar-mesa']);
        } else {
          console.log("Usuário não está logado!");
        }
      },
      error: (error) => {
        console.error("Seu Login Falhou 💣", error);
      }
    })
  }
}
