import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { Product } from 'src/app/Models/Produto';
import { formatProducts } from 'src/app/Utils/transforms';

import { ErrorDialogComponent } from '../../Components/error-dialog/error-dialog.component';
import { AuthService } from '../Authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly urlAPI = 'https://burger-queen-api-mock.up.railway.app';
  private itemCount = new Subject<number>();

  itemCount$ = this.itemCount.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    public dialog: MatDialog
  ) {}

  private getAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  registerProduct(product: Product): Observable<Product> {
    const headers = this.getAuthorizationHeader();
    const { id, ...productData } = product; // Removendo o ID para permitir autoincrement
    return this.http
      .post<Product>(`${this.urlAPI}/products`, productData, { headers })
      .pipe(
        catchError((error) => {
          this.onError('Erro ao cadastrar produto. 😕');
          return of(product);
        })
      );
  }

  listProducts(): Observable<Product[]> {
    const headers = this.getAuthorizationHeader();
    return this.http
      .get<Product[]>(`${this.urlAPI}/products`, { headers })
      .pipe(
        map((apiData) => apiData.map((product) => formatProducts(product))),
        catchError((error) => {
          this.onError('Erro ao carregar produtos. 😕');
          return of([]);
          // return error;
        })
      );
  }

  getProductById(id: number): Observable<Product> {
    const headers = this.getAuthorizationHeader();
    return this.http
      .get<any>(`${this.urlAPI}/products/${id}`, { headers })
      .pipe(
        map((apiData) => formatProducts(apiData)),
        catchError((error) => {
          this.onError('Erro ao carregar produto. 😕');
          return of({
            id: -1,
            name: 'Erro ao carregar',
            price: 0,
            image: '',
            tipo: '',
          } as Product);
        })
      );
  }

  updateItemCount(count: number) {
    this.itemCount.next(count);
  }

  deleteProduct(id: number): Observable<void> {
    const headers = this.getAuthorizationHeader();
    return this.http
      .delete<void>(`${this.urlAPI}/products/${id}`, { headers })
      .pipe(
        catchError((error) => {
          this.onError('Erro ao excluir produto. 😕');
          return of();
        })
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = this.getAuthorizationHeader();
    console.log(product)
    return this.http
      .put<Product>(`${this.urlAPI}/products/${product.id}`, product, {
        headers,
      })
      .pipe(
        catchError((error) => {
          this.onError('Erro ao atualizar produto. 😕');
          console.error(error);
          return of(product);
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
