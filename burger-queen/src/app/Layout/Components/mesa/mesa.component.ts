import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Login } from 'src/app/Models/Login';
import { AuthService } from 'src/app/Shared/Services/Authentication/auth.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css'],
})
export class MesaComponent implements OnInit {
  @Input() login: Login[] = [];
  mesas: { numero: string; ocupada: boolean }[] = [];
  mesaId: string = '';
  usuarioLogado: string = '';

  constructor(private auth: AuthService, private router: ActivatedRoute) {
    this.createMesas(16);
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.auth.getUserInfo().subscribe((user) => {
        if (user) {
          this.usuarioLogado = user.email;
        }
      });
    }

    this.router.queryParams.subscribe((params) => {
      this.mesaId = localStorage.getItem('mesa') || params['mesaId'] || '';
    });
  }

  createMesas(totalMesas: number): void {
    for(let i = 1; i <= totalMesas; i++){
      this.mesas.push({
        numero: i.toString().padStart(2, '0'), ocupada: false
      })
    }
  }

  deslogar() {
    this.auth.logout();
  }
  ocuparMesa(numero: string): void {
    const mesa = this.mesas.find((m) => m.numero === numero);
    if (mesa) {
      mesa.ocupada = true;
      localStorage.setItem('mesa', numero);
    }
  }
}
