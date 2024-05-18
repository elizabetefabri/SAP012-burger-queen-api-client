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
  mesas: { numero: string; ocupada: boolean }[] = [
    { numero: '01', ocupada: false },
    { numero: '02', ocupada: false },
    { numero: '03', ocupada: false },
    { numero: '04', ocupada: false },
    { numero: '05', ocupada: false },
    { numero: '06', ocupada: false },
    { numero: '07', ocupada: false },
    { numero: '08', ocupada: false },
    { numero: '09', ocupada: false },
    { numero: '10', ocupada: false },
    { numero: '11', ocupada: false },
    { numero: '12', ocupada: false },
    { numero: '13', ocupada: false },
    { numero: '14', ocupada: false },
    { numero: '15', ocupada: false },
    { numero: '16', ocupada: false },
  ];
  mesaId: string = '';
  usuarioLogado: string = '';

  constructor(private auth: AuthService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.auth.getUserInfo().subscribe((user) => {
        if (user) {
          this.usuarioLogado = user.email;
        }
      });
    }

    this.router.queryParams.subscribe((params) => {
      this.mesaId = params['mesaId'] || '';
    });
  }

  deslogar() {
    this.auth.logout();
  }
  ocuparMesa(numero: string): void {
    const mesa = this.mesas.find((m) => m.numero === numero);
    if (mesa) {
      mesa.ocupada = true;
    }
  }
}
