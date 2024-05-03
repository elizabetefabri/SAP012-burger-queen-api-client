import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/Models/Produto';

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

export class RegistrarPedidoComponent implements OnInit{
  product: Product[] = [];
  beverages: Product[] = [];
  lunch: Product[] = [];
  breakfast: Product[] = [];
  totalPedido: number = 0;
  name: string = "";

  constructor() {}

  ngOnInit(): void {  }


  atualizarTotal(event: { products: { product: Product, quantity: number }[], index: number, isSum: boolean, total: number }): void {

    if(event.isSum){
      this.totalPedido += event.total;

    } else {
      this.totalPedido -= event.total;
    }
  }
}
