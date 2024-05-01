import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';
import { Products } from 'src/Models/Produto';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.css']
})
export class FinalizarPedidoComponent implements OnInit{
  @Input() selectedProducts: { product: Products, quantity: number }[] = [];
  @Input() totalPedido: number = 0;
  @Input() mesaId: string = '';
  nomeCliente: string = '';
  nomeCadastrado: string = '';
  @Input() products: Products[] = [];

  @Output() totalEmmiter: EventEmitter<{
    products: { product: Products; quantity: number }[];
    index: number;
    isSum: boolean;
  }> = new EventEmitter<{
    products: { product: Products; quantity: number }[];
    index: number;
    isSum: boolean;
  }>();

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMesaIdFromUrl();
  }

  getMesaIdFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.mesaId = params["mesaId"] || '';
    });
  }

  registerNameCliente(): void {
    if (this.nomeCliente.trim() !== '') {
      this.nomeCadastrado = this.nomeCliente;
      this.nomeCliente = '';
    }
  }

  updateTotalPedido(): void {
    this.totalPedido = this.selectedProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  handleQuantityChange(change: { product: Products; quantity: number }): void {
    const index = this.selectedProducts.findIndex(
      (item) => item.product.id === change.product.id
    );

    if (index !== -1) {
      this.selectedProducts[index].quantity = change.quantity;

      if (change.quantity === 0) {
        this.selectedProducts.splice(index, 1);
      }
    } else if (change.quantity > 0) {
      this.selectedProducts.push(change);
    }
    this.calculateTotal();
    // this.updateTotalPedido();
  }
  calculateTotal(): void {
    this.totalEmmiter.emit({
      products: this.selectedProducts,
      index: this.selectedProducts.length - 1,
      isSum: true,
    });
  }


}
