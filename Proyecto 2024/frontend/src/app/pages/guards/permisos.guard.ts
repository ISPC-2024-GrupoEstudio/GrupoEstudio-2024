import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

export const permisosGuard = (
  router: Router
): ((route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree) => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const isLoggedIn = localStorage.getItem('user') !== null; //se comprueba la presencia de usuario

    return new Observable<boolean>(observer => {
      if (isLoggedIn) {
        observer.next(true); // permite el acceso si estas logueado
        observer.complete();
        return;
      }

      if (confirm('Necesitas iniciar sesión para acceder al carrito. ¿Deseas ingresar?')) {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }

      observer.next(false); // denega el accesos sino iniciaste sesion
      observer.complete();
    });
  };
};

