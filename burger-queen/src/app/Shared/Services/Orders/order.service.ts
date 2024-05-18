import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalComponent } from 'src/app/Layout/Components/menu/modal/modal.component';
import { Item, Order } from 'src/app/Models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = 'https://burger-queen-api-mock.up.railway.app';
  private modalStateSource = new BehaviorSubject<boolean>(false);
  modalState = this.modalStateSource.asObservable();
  private itemsSource = new BehaviorSubject<Item[]>([]);
  items$ = this.itemsSource.asObservable();

  order: Order[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  openModal(): void {
    this.dialog.open(ModalComponent);
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  addItem(item: Item): void {
    let items = this.itemsSource.getValue();
    const index = items.findIndex((i) => i.product.id === item.product.id);
    if (index !== -1) {
      // items[index].quantity += item.quantity;
      items[index].quantity = item.quantity;
    } else {
      items.push(item);
    }
    this.itemsSource.next(items);
  }

  removeItem(item: Item): void {
    let items = this.itemsSource.getValue();
    items = items.filter((i) => i.product.id !== item.product.id);
    this.itemsSource.next(items);
  }

  clearItems(): void {
    this.itemsSource.next([]);
  }

  // Cabeçalhos de autorização
  private solicitarAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  postOrder(order: Order): Observable<any> {
    return this.http.post(this.apiUrl, order, {
      headers: this.solicitarAuthorizationHeader(),
    });
  }

  getOrder(status: string): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.apiUrl}/orders?status=${status}&_sort=dataEntry&_order=asc`,
      { headers: this.solicitarAuthorizationHeader() }
    );
  }

  patchOrder(id: string, status: string): Observable<Order> {
    return this.http.patch<Order>(
      `${this.apiUrl}/orders/${id}`,
      { status: status },
      { headers: this.solicitarAuthorizationHeader() }
    );
  }
}
