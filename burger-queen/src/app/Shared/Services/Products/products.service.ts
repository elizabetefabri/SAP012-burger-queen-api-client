import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Product } from 'src/Models/Produto';
import { AuthService } from '../auth.service';
import { formatProducts } from 'src/Utils/transforms';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly apiUrl = "https://burger-queen-api-mock.up.railway.app";

  // Método para criar os cabeçalhos de autorização
  private solicitarAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

   // Método para listar todos os produtos
   listProducts(): Observable<Product[]> {
    // return this.http.get<any[]>(`${this.apiUrl}/products`).pipe(
    //   map(data => data.map(apiData => formatProducts(apiData))),
    //   catchError(this.handleError)
    // );
    const headers = this.solicitarAuthorizationHeader();
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { headers }).pipe(
      map(apiData =>
        apiData.map(product => {
          console.log(product)
          return formatProducts(product)
        })

      ),

      catchError(this.handleError)
    );
  }

  listProductsByType(type: string): Observable<Product[]> {
    const headers = this.solicitarAuthorizationHeader();
    return this.http.get<Product[]>(`${this.apiUrl}/products?type=${type}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obter um produto específico pelo ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`).pipe(
      map(apiData => formatProducts(apiData)),
      catchError(this.handleError)
    );
  }

  // Adicionar novo produto
  postProduct(product: Product): Observable<any> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product, {
        headers: this.solicitarAuthorizationHeader(),
    });
  }

  // Remover produto por ID
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}`);
  }

  // Postar pedido
  postOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, order, {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        }),
    });
  }

  // Método para lidar com erros
  private handleError(error: any): Observable<never> {
    console.error('Erro ao processar a solicitação:', error);
    return throwError('Ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde.');
  }
}

