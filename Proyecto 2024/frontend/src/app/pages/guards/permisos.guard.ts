import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

export const permisosGuard = (
  router: Router
): ((route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree) => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const isLoggedIn = localStorage.getItem('user') !== null; // Check for user presence

    return new Observable<boolean>(observer => {
      if (isLoggedIn) {
        observer.next(true); // Allow access if logged in
        observer.complete();
        return;
      }

      if (confirm('Necesitas iniciar sesión para acceder al carrito. ¿Deseas ingresar?')) {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }

      observer.next(false); // Deny access if not logged in
      observer.complete();
    });
  };
};

