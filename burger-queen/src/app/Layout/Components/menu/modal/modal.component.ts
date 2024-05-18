import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/Models/Order';
import { Product } from 'src/app/Models/Produto';
import { OrderService } from 'src/app/Shared/Services/Orders/order.service';
import { ProductService } from 'src/app/Shared/Services/Products/product.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() mesaId: string = '';
  totalPedido: number = 0;
  @Output() quantityChange: EventEmitter<Item> = new EventEmitter();
  @Output() totalEmmiter: EventEmitter<{
    product: { product: Product; quantity: number }[];
    index: number;
    isSum: boolean;
    total: number;
  }> = new EventEmitter<{
    product: { product: Product; quantity: number }[];
    index: number;
    isSum: boolean;
    total: number;
  }>();

  nomeCliente: string = '';
  nomeCadastrado: string = '';
  items: Item[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMesaIdFromUrl();
    this.orderService.items$.subscribe((items) => {
      this.items = items;
      this.calculateTotal(); // Calcular o total sempre que os itens forem atualizados
    });
  }

  getMesaIdFromUrl(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.mesaId = params['mesaId'] || '';
    });
  }

  registerNameCliente(): void {
    if (this.nomeCliente.trim() !== '') {
      this.nomeCadastrado = this.nomeCliente;
    }
    this.nomeCliente = '';
  }

  handleQuantityChange(change: Item): void {
    const total = this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const eventPayload = {
      product: this.items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      index: this.items.findIndex(
        (item) => item.product.id === change.product.id
      ),
      isSum: true, // ou false, conforme a lógica que você deseja
      total: total,
    };
    this.totalEmmiter.emit(eventPayload);
    this.calculateTotal();
  }

  removeItem(item: Item): void {
    this.orderService.removeItem(item);
    this.calculateTotal();
  }

  openModal(): void {
    this.orderService.openModal();
  }

  closeModal(): void {
    this.orderService.closeModal();
  }

  calculateTotal(): void {
    this.totalPedido = this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  enviarPedido(): void {}
}
