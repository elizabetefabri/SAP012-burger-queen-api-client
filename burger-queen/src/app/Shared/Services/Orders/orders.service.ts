import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalComponent } from 'src/app/Layout/Components/registrar-pedido/menu/modal/modal.component';

import { Order } from 'src/Models/Order';
import { ProductsQty } from 'src/Models/Produto';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly apiUrl = 'https://burger-queen-api-mock.up.railway.app';
  productsOrder: ProductsQty[] = [];
  order: Order[] = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  private productsOrderSubject = new BehaviorSubject<ProductsQty[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private orderSubject = new BehaviorSubject<Order[]>([]);
  private qtySubject = new BehaviorSubject<number>(0);

  openModal(): void {
    this.dialog.open(ModalComponent);
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  get productsOrder$(): Observable<ProductsQty[]> {
    return this.productsOrderSubject.asObservable();
  }

  get total$(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  get order$(): Observable<Order[]> {
    return this.orderSubject.asObservable();
  }

  get qty$(): Observable<number> {
    return this.qtySubject.asObservable();
  }

  private totalCount(): void {
    const total: number = this.productsOrder.reduce(
      (total, el) => (total += el.product.price * el.qty),
      0
    );
    this.totalSubject.next(total);
  }

  deleteProduct(id: string): void {
    this.productsOrder = this.productsOrder.filter((el) => {
      return el.product.id.toString() !== id;
    });
    this.productsOrderSubject.next(this.productsOrder);
    this.totalCount();
    this.qtyAddedProducts();
  }

  qtyOperations(operations: string, id: string) {
    const product = this.productsOrder.find((el) => {
      return el.product.id.toString() === id;
    });
    if (product) {
      if (operations === 'minus' && product.qty > 0) {
        product.qty = product.qty - 1;
        this.totalCount();
        this.qtyAddedProducts();
      }
      if (operations === 'add') {
        product.qty = product.qty + 1;
        this.totalCount();
        this.qtyAddedProducts();
      }
      if (product.qty === 0) {
        this.deleteProduct(id);
        this.qtyAddedProducts();
      }
    }
  }

  qtyAddedProducts() {
    const qty: number = this.productsOrder.reduce((a, b) => (a += b.qty), 0);
    this.qtySubject.next(qty);
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
    return this.http.post(this.apiUrl, order, { headers: this.solicitarAuthorizationHeader() });
  }

  getOrder(status: string): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.apiUrl}/orders?status=${status}&_sort=dataEntry&_order=asc`,
      { headers: this.solicitarAuthorizationHeader() });
  }

  patchOrder(id: string, status: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/orders/${id}`,
    { status: status },
    { headers: this.solicitarAuthorizationHeader() });
  }
}
