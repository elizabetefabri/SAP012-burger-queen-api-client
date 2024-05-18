import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/Order';
import { OrderService } from 'src/app/Shared/Services/Orders/order.service';

@Component({
  selector: 'app-chef-orders',
  templateUrl: './chef-orders.component.html',
  styleUrls: ['./chef-orders.component.css']
})
export class ChefOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrder('pending').subscribe(orders => {
      this.orders = orders;
    });
  }

  markOrderAsReady(order: Order): void {
    if (order.id !== undefined) {
      this.orderService.patchOrder(order.id.toString(), 'ready').subscribe(() => {
        this.loadOrders();
      });
    } else {
      console.error('Order ID is undefined');
    }
  }
}
