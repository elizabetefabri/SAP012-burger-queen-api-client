import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/Models/Usuario';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient, private router: Router) { }

  // Método para listar todos os usuários
  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Método para obter um usuário específico pelo ID
  getUsersById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // Método para criar um novo usuário
  createUsers(users: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, users);
  }

  // Método para atualizar os dados de um usuário existente
  updateUsers(id: number, users: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${id}`, users);
  }

  // Método para excluir um usuário pelo ID
  deleteUsers(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}
