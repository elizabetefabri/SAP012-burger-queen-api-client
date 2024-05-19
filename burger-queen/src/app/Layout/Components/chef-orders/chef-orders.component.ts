import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/Models/Order';
import { OrderService } from 'src/app/Shared/Services/Orders/order.service';

@Component({
  selector: 'app-chef-orders',
  templateUrl: './chef-orders.component.html',
  styleUrls: ['./chef-orders.component.css']
})
export class ChefOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.startClock();
  }

  loadOrders(): void {
    this.orderService.getOrder('pending').subscribe(orders => {
      this.orders = orders;
    });
  }

  startClock(): void {
    setInterval(() => {
      this.orders.forEach(order => {
        if (order.dateEntry) {
          order.preparationTime = this.getPreparationTime(order);
        }
      });
    }, 1000); // Atualiza a cada segundo
  }

  markOrderAsReady(order: Order): void {
    if (order.id !== undefined) {
      this.orderService.patchOrder(order.id.toString(), 'ready').subscribe(() => {
        this.loadOrders();
        this.showNotification('Seu pedido ficou pronto 🎉🎉🎉');
      });
    } else {
      console.error('Order ID is undefined');
    }
  }

  getPreparationTime(order: Order): string {
    const start = new Date(order.dateEntry);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffSecs / 60);
    const seconds = diffSecs % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 0, // Define a duração para 0 para que o Snackbar não feche automaticamente
      horizontalPosition: 'center', // Centraliza horizontalmente
      verticalPosition: 'top', // Centraliza verticalmente
    });
  }
}
