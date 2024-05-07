import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

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
  beverages: Product[] = [];
  lunch: Product[] = [];
  breakfast: Product[] = [];
  totalPedido: number = 0;
  name: string = "";

  constructor() {}

  ngOnInit(): void {}

  atualizarTotal(event: { products: { product: Product, quantity: number }[], index: number, isSum: boolean, total: number }): void {
    if (event.isSum) {
      this.totalPedido += Math.abs(event.total);
    } else {
      this.totalPedido -= Math.abs(event.total);
    }
  }
}

// 1. Utilize o método filter para carregar os produtos.
// 2. Chame os items do pedido de "tipo do produto".
// 3. Copie os items para mostrar os elementos.
// 4. Coloque os códigos dentro de cards.
// 5. Declare os tipos no menu-componente.
// 6. Na função loadProducts, crie uma função dentro dela chamada classificarProduto.
// 7. Utilize os items para carregar os produtos, que serão do tipo items.
