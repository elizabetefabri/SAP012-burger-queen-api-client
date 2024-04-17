import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['/registrar-mesa']);
      },
      error: (error) => {
        console.error('Erro de autenticação:', error);
        alert('Email ou senha incorretos.');
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
