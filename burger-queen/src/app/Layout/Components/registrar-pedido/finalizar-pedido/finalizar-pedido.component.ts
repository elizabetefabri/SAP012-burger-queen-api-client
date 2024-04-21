import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';
import { Products } from 'src/Models/Produto';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.css']
})

export class FinalizarPedidoComponent implements OnInit{
  @Input() selectedProducts: { product: Products, quantity: number }[] = [];
  mesaId: string = '';

  constructor(private authService: AuthService, private productService: ProductsService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.getMesaIdFromUrl();
  }

  getMesaIdFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.mesaId = params["mesaId"] || '';
    });
  }

  getTotal(): number {
    return this.selectedProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  removeItem(index: number): void {
    this.selectedProducts.splice(index, 1);
  }
}
