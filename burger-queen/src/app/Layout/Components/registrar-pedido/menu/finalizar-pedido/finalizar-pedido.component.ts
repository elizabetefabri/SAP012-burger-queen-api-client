import { OrdersService } from './../../../../../Shared/Services/Orders/orders.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';
import { Product } from 'src/Models/Produto';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.css']
})
export class FinalizarPedidoComponent implements OnInit{
  @Input() selectedProducts: { product: Product, quantity: number }[] = [];
  @Input() totalPedido: number = 0;
  @Input() mesaId: string = '';
  nomeCliente: string = '';
  nomeCadastrado: string = '';
  orders: any[] = [];

  @Input() products: Product[] = [];

  @Output() totalEmmiter: EventEmitter<{
    products: { product: Product; quantity: number }[];
    index: number;
    isSum: boolean;
  }> = new EventEmitter<{
    products: { product: Product; quantity: number }[];
    index: number;
    isSum: boolean;
  }>();

  constructor(
    private orderService: OrdersService,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMesaIdFromUrl();
    this.loadOrders();
  }

  getMesaIdFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.mesaId = params["mesaId"] || '';
    });
  }

  registerNameCliente(): void {
    if (this.nomeCliente.trim() !== '') {
      this.nomeCadastrado = this.nomeCliente;
    }
    this.nomeCliente = '';
  }

  loadOrders(): void {
    this.orderService.getOrder(status).subscribe(
      (response) => {
        this.orders = response;
      },
      (error) => {
        console.error("Erro ao carregar pedidos: ", error);
      }
    )
  }

  updateTotalPedido(): void {
    this.totalPedido = this.selectedProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  handleQuantityChange(change: { product: Product; quantity: number }): void {
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
  }


  calculateTotal(): void {
    this.totalEmmiter.emit({
      products: this.selectedProducts,
      index: this.selectedProducts.length - 1,
      isSum: true,
    });
  }
  removeItem(): void {}
}
