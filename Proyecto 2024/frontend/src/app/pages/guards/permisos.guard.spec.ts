import { TestBed } from '@angular/core/testing';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { permisosGuard } from './permisos.guard';
import { Observable } from 'rxjs';

describe('permisosGuard', () => {
  let guard: CanActivate;
  let mockRouter: Router;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = TestBed.inject(permisosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('user');

    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const routerStateSnapshot = {} as RouterStateSnapshot;

    const canActivateResult = guard.canActivate(routeSnapshot, routerStateSnapshot);

    expect(canActivateResult).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and navigate to login when user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(window, 'confirm').and.returnValue(true);

    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const routerStateSnapshot = { url: '/carrito' } as RouterStateSnapshot;

    const canActivateResult = guard.canActivate(routeSnapshot, routerStateSnapshot);

    expect(canActivateResult instanceof Observable).toBe(true);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: '/carrito' } });
  });

  it('should deny access and not navigate when user cancels login prompt', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(window, 'confirm').and.returnValue(false);

    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const routerStateSnapshot = {} as RouterStateSnapshot;

    const canActivateResult = guard.canActivate(routeSnapshot, routerStateSnapshot);

    expect(canActivateResult).toBe(false);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
