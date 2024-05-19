import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://burger-queen-api-mock.up.railway.app';

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users?email=${email}`);
  }
}
