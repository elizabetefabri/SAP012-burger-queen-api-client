import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, first, Observable, of, tap } from 'rxjs';
import { User } from 'src/app/Models/Usuario';
import { AuthService } from '../Authentication/auth.service';
import { ErrorDialogComponent } from '../../Components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://burger-queen-api-mock.up.railway.app';

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

  registerUser(user: User): Observable<User> {
    const headers = this.getAuthorizationHeader();
    return this.http.post<User>(`${this.apiUrl}/users`, user, { headers }).pipe(
      catchError((error) => {
        this.onError('Erro ao cadastrar usuário. 😕');
        return of(user);
      })
    );
  }


  listUsers(): Observable<User[]> {
    const headers = this.getAuthorizationHeader();
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers }).pipe(
      catchError((error) => {
        this.onError('Erro ao carregar usuários. 😕');
        return of([]);
      })
    );
  }

  deleteUser(id: string): Observable<void> {
    const headers = this.getAuthorizationHeader();
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`, { headers }).pipe(
      catchError((error) => {
        this.onError('Erro ao excluir usuário. 😕');
        return of();
      })
    );
  }

  updateUser(user: User): Observable<User> {
    const headers = this.getAuthorizationHeader();
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user, { headers }).pipe(
      catchError((error) => {
        this.onError('Erro ao atualizar usuário. 😕');
        return of(user);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
