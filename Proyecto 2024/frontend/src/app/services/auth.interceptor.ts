import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Esto debería funcionar si el servicio está bien registrado

  const accessToken = localStorage.getItem('access_token');
  let authReq = req;

  if (accessToken && !req.url.includes('cloudinary.com')) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });
  }

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        return handle401Error(authReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService) {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    return throwError(() => new Error('No refresh token'));
  }

  return authService.refreshToken(refreshToken).pipe(
    switchMap((tokenData: any) => {
      const newAccessToken = tokenData.access;
      localStorage.setItem('access_token', newAccessToken);

      return next(request.clone({
        setHeaders: { Authorization: `Bearer ${newAccessToken}` }
      }));
    }),
    catchError(err => {
      authService.logout();
      return throwError(() => err);
    })
  );
}