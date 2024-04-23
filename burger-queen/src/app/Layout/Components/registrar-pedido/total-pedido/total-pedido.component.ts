import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-pedido',
  templateUrl: './total-pedido.component.html',
  styleUrls: ['./total-pedido.component.css']
})
export class TotalPedidoComponent {

  @Input() totalPedido: number = 0;


}
