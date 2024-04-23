import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from 'src/Models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly apiUrl = "https://burger-queen-api-mock.up.railway.app";

  constructor(private http: HttpClient) { }

  // Método para listar todas as ordens
  listOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  // Método para obter uma ordem específica pelo ID
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`);
  }

  // Método para criar uma nova ordem
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  // Método para atualizar os dados de uma ordem existente
  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/orders/${id}`, order);
  }

  // Método para excluir uma ordem pelo ID
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/${id}`);
  }
}
