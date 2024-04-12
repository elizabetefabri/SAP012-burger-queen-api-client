import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiUrl: string = environment.API_URL;

  constructor(
    readonly http: HttpClient,
   ) { }

   login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
   // Método para verificar se o usuário está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para logout
  logout(): void {
    localStorage.removeItem('token');
  }
// o serviço aqui utilizado ira ser realizado somente para logar
}
