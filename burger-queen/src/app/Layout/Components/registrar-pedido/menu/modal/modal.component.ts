import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrdersService } from 'src/app/Shared/Services/Orders/orders.service';
import { Item } from 'src/Models/Order';
import { Product } from 'src/Models/Produto';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  @Input() item!: Item | undefined;
  @Input() mesaId: string = '';
  @Input() totalPedido: number = 0;
  @Output() quantityChange: EventEmitter<Item> = new EventEmitter();
  @Output() totalEmmiter: EventEmitter<Item> = new EventEmitter<Item>();

  nomeCliente: string = '';
  nomeCadastrado: string = '';
  orders: any[] = [];
  // @Input() product: Product[] = [];

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMesaIdFromUrl();
    if (!this.item) {
      // this.item = this.item.filter((this.item) => {
      //   item.product.tipo === this.type } );
      // this.item = { product: { id: number, name: '', price: number, image: '', tipo: '' }, quantity: 1 };

    }
    console.log(this.item)
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
  handleQuantityChange(change: Item): void {
    this.totalEmmiter.emit(change)
  }

  removeItem(): void {
    if (this.item && this.item.quantity > 0) {
      this.item.quantity--;
      this.quantityChange.emit(this.item);
    }
  }

  openModal(): void {
    this.orderService.openModal();
  }
  closeModal(): void {
    this.orderService.closeModal();
  }
}
