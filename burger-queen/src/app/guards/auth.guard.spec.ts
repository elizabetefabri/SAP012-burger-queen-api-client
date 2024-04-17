import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let routeMock: Partial<ActivatedRouteSnapshot>;
  let stateMock: Partial<RouterStateSnapshot>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    routeMock = {};
    stateMock = { url: '/some-url' };
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for canActivate if token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');
    expect(guard.canActivate(routeMock as ActivatedRouteSnapshot, stateMock as RouterStateSnapshot)).toBeTruthy();
  });

  it('should redirect to login if no token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'createUrlTree').and.returnValue(new UrlTree());
    expect(guard.canActivate(routeMock as ActivatedRouteSnapshot, stateMock as RouterStateSnapshot)).toEqual(router.createUrlTree(['/login']));
  });
});
