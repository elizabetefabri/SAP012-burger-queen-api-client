import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { Product } from 'src/app/Models/Produto';
import { formatProducts } from 'src/app/Utils/transforms';
import { AuthService } from '../Authentication/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../Components/error-dialog/error-dialog.component';

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
  // Métodos para listar os produtos
  listProducts(): Observable<Product[]> {
    const headers = this.getAuthorizationHeader();
    return this.http
      .get<Product[]>(`${this.urlAPI}/products`, { headers })
      .pipe(
        map((apiData) => apiData.map((product) => formatProducts(product))),
        catchError((error) => {
          this.onError('Erro ao carregar produtos. 😕');
          return of([]);
        })
      );
  }

  listProductsByType(type: string): Observable<Product[]> {
    const headers = this.getAuthorizationHeader();
    return this.http
      .get<Product[]>(`${this.urlAPI}/products?type=${type}`, { headers })
      .pipe(
        catchError((error) => {
          this.onError('Erro ao carregar produtos. 😕');
          return of([]);
        })
      );
  }

  // Método para obter um produto específico pelo ID
  getProductById(id: number): Observable<Product> {
    const headers = this.getAuthorizationHeader();
    return this.http
      .get<any>(`${this.urlAPI}/products/${id}`, { headers })
      .pipe(
        map((apiData) => formatProducts(apiData)),
        catchError((error) => {
          this.onError('Erro ao carregar produto. 😕');
          // Retornar um objeto Produto padrão em caso de erro
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
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
