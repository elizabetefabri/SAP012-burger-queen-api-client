import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { Login } from 'src/Models/Login';

@Component({
  selector: 'app-registrar-mesa',
  templateUrl: './registrar-mesa.component.html',
  styleUrls: ['./registrar-mesa.component.css']
})
export class RegistrarMesaComponent implements OnInit{
  @Input() login: Login[] = [];
  mesas: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  mesaId: string = '';
  usuarioLogado: string = '';

  constructor(private auth: AuthService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.auth.getUserInfo().subscribe(user => {
        if (user) {
          this.usuarioLogado = user.email;
        }
      });
    }

    this.router.queryParams.subscribe(params => {
      this.mesaId = params["mesaId"] || '';
    });
  }

  deslogar() {
    this.auth.logout();
  }
}
