import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Subscription } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login', 'logout']);
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login on AuthService when form is valid and submitted', () => {
    component.email = 'test@example.com';
    component.password = 'password';
    component.onLogin();
    expect(authService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password'
    );
  });

  it('should alert the user if email or password is missing', () => {
    spyOn(window, 'alert');
    component.email = ''; // Email vazio para simular o erro
    component.password = ''; // Senha vazia
    component.onLogin();
    expect(window.alert).toHaveBeenCalledWith(
      'Por favor, preencha todos os campos.'
    );
  });

  // it('should navigate to home page on successful login', () => {
  //   spyOn(authService, 'login').and.returnValue(of({ accessToken: 'fakeToken' }).subscribe());
  //   let navigateSpy = spyOn(router, 'navigate');
  //   component.email = 'test@example.com';
  //   component.password = 'password';
  //   component.onLogin();
  //   expect(navigateSpy).toHaveBeenCalledWith(['/registrar-mesa']);
  // });
});
