import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { User } from 'src/app/Models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string =
    'https://burger-queen-api-mock.up.railway.app';
  private currentUser: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserInfo(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.accessToken);
          this.currentUser.next(response.user);
        }),
        catchError((error) => {
          alert('Email ou senha incorretos.');
          throw error;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.currentUser.next(null);
  }

  registerUser(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/users`, user, this.getHttpOptions())
      .pipe(
        catchError((error) => {
          console.error('Registration failed:', error);
          throw error;
        })
      );
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/users/${id}`,
      user,
      this.getHttpOptions()
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/users/${id}`,
      this.getHttpOptions()
    );
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
  }
}
