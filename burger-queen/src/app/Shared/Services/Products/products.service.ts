import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Products } from 'src/Models/Produto';
import { formatProducts } from 'src/Utils/transforms';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly apiUrl: string = environment.API_URL;
  // Método para criar os cabeçalhos de autorização
  private solicitarAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private http: HttpClient) {}

   // Método para listar todos os produtos
   listProducts(): Observable<Products[]> {
    const headers = this.solicitarAuthorizationHeader();
    return this.http.get<any[]>(`${this.apiUrl}/products`, { headers }).pipe(
      map(data => data.map(apiData => formatProducts(apiData))),
      catchError(this.handleError)
    );
  }

  listProductsByType(type: string): Observable<Products[]> {
    const headers = this.solicitarAuthorizationHeader();
    return this.http.get<Products[]>(`${this.apiUrl}/products?type=${type}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obter um produto específico pelo ID
  getProductById(id: number): Observable<Products> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`).pipe(
      map(apiData => formatProducts(apiData)),
      catchError(this.handleError)
    );
  }



  // Método para lidar com erros
  private handleError(error: any): Observable<never> {
    console.error('Erro ao processar a solicitação:', error);
    return throwError('Ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde.');
  }
}

