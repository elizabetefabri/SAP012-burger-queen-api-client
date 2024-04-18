import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';

@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.css'],
  animations: [
    trigger('translateTab', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition('* => void', [
        animate('500ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})

export class RegistrarPedidoComponent {

  constructor(private auth: AuthService, private router: Router) {}

  deslogar(){
    this.auth.logout()
  }
}
