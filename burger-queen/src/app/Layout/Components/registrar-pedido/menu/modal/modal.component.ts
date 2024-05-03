import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { OrdersService } from 'src/app/Shared/Services/Orders/orders.service';


enum Operation {
  Add = 'add',
  Minus = 'minus'
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  constructor(private orderService: OrdersService) {}

  productsOrder$ = this.orderService.productsOrder$;
  total$ = this.orderService.total$;
  order$ = this.orderService.order$;


  totalPedido: number = 0;

  ngOnInit(): void {
    // this.productsOrder$.subscribe((response) => (this.noProduct = response));
  }

  delete(id: string) {
    this.orderService.deleteProduct(id);
  }

  update(operations: 'add' | 'minus', id: string) {
    this.orderService.qtyOperations(operations, id);
  }

  openModal(): void {
    this.orderService.openModal();
  }
  closeModal(): void {
    this.orderService.closeModal();
  }
}
