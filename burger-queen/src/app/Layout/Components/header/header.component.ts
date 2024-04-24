import { AuthService } from 'src/app/Shared/Services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  mesaId: string = '';
  nomeCliente: string = '';
  usuarioLogado: string = '';

  constructor(private auth: AuthService) {}

    // getUsuarioLogado(): void {
  //   this.authService.getCurrentUser().subscribe(user => {
  //     if (user) {
  //       this.usuarioLogado = user.role; // Atribui o papel do usuário logado
  //     } else {
  //       this.usuarioLogado = 'Usuário não logado'; // Define um valor padrão se nenhum usuário estiver logado
  //     }
  //   });
  // }


  deslogar(){
    this.auth.logout()
  }
}
