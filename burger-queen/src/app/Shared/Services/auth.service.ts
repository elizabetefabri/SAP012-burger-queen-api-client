import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Login } from 'src/Models/Login';
import { User } from 'src/Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.API_URL;
  private currentUser: BehaviorSubject<Login | null> = new BehaviorSubject<Login | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    // this.checkAuthentication();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserInfo(): Observable<Login | null> {
    return this.currentUser.asObservable();
  }

  login(email: string, password: string): Subscription {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['/registrar-mesa']);
        // this.getCurrentUser().subscribe();
      },
      error: (error) => {
        console.error('Erro de autenticação:', error);
        alert('Email ou senha incorretos.');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.currentUser.next(null);
  }

  // getCurrentUser(): Observable<Login | null> {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     this.currentUser.next(null);
  //     return of(null);
  //   }

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });

  //   return this.http.get<Login>(`${this.apiUrl}/user`, { headers }).pipe(
  //     catchError((error) => {
  //       console.error('Erro ao obter usuário:', error);
  //       return of(null);
  //     })
  //   );
  // }

  // private checkAuthentication(): void {
  //   if (this.isAuthenticated()) {
  //     this.getCurrentUser().subscribe();
  //   }
  // }
}
