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




  totalPedido: number = 0;

  ngOnInit(): void {
    // this.productsOrder$.subscribe((response) => (this.noProduct = response));
  }


  openModal(): void {
    this.orderService.openModal();
  }
  closeModal(): void {
    this.orderService.closeModal();
  }
}
