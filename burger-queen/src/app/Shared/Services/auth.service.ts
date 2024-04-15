import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  readonly apiUrl: string = environment.API_URL;

  constructor(
    private http: HttpClient,
   ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  //  login(email: string, password: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, { email, password });
  // }

  login() {
    localStorage.setItem('token', '123456')
  }

  logout(){
    localStorage.clear();
  }

}
