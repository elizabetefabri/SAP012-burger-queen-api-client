import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

import { Router } from '@angular/router';
import { RegistrarMesaComponent } from 'src/app/Layout/Components/registrar-mesa/registrar-mesa.component';
import { LoginComponent } from 'src/app/Layout/Components/login/login.component';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let store: Record<string, string> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'registrar-mesa', component: RegistrarMesaComponent },
          { path: 'login', component: LoginComponent }
        ])
      ],
      providers: [
        AuthService
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    store = {};

    // Mock localStorage
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      store[key] = value;
      return value;
    });
    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   // LOGIN
   it('should store accessToken in localStorage on successful login', () => {
    const mockResponse = {
      accessToken: 'abc123'
    };

    service.login('test@example.com', 'password');
    const req = httpMock.expectOne(`https://burger-queen-api-mock.up.railway.app/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'abc123');
    expect(req.request.body).toEqual({ email: 'test@example.com', password: 'password' });
  });

  it('should handle errors if login fails', () => {
    const mockError = new ErrorEvent('Network error', {
      message: "Login failed"
    });

    service.login('test@example.com', 'password');
    const req = httpMock.expectOne(`https://burger-queen-api-mock.up.railway.app/login`);
    req.error(mockError);

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  // LOGOUT
  it('should clear localStorage and navigate to login', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    service.logout();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
