import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';
import { Products } from 'src/Models/Produto';

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
  product: Products[] = [];

  beverages: Products[] = [];
  lunch: Products[] = [];
  breakfast: Products[] = [];

  totalPedido: number = 0;

  constructor(private authService: AuthService, private productService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadProducts();
    // this.getUsuarioLogado();
  }

  loadProducts(): void {
    this.productService.listProducts().subscribe({
      next: (data: Products[]) => {
        this.product = data;
      },
      error: (error) => {

        console.log('Erro ao processar a solicitação:', error);

        console.log('Erro ao carregar produtos: ', error);

      }
    });
  }

  atualizarTotal(event: {price: number, isSum: boolean}): void{
    console.log(event);
    if(event.isSum){
      this.totalPedido += event.price;
    } else {
      this.totalPedido -= event.price;
    }
  }
}
