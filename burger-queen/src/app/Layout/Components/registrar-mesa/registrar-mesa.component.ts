import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';
import { Login } from 'src/Models/Login';

@Component({
  selector: 'app-registrar-mesa',
  templateUrl: './registrar-mesa.component.html',
  styleUrls: ['./registrar-mesa.component.css']
})
export class RegistrarMesaComponent implements OnInit{
  @Input() login: Login[] = [];
  mesaId: string = '';
  usuarioLogado: string = '';

  constructor(private auth: AuthService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      // Inscreva-se para receber as informações de login do usuário
      this.auth.getUserInfo().subscribe(user => {
        if (user) {
          // Se existir um usuário logado, atualize o nome de usuário
          this.usuarioLogado = user.email;
        }
      });
    }

    this.router.queryParams.subscribe(params => {
      this.mesaId = params["mesaId"] || '';
    });
  }


  deslogar(){
    this.auth.logout()
  }
}
