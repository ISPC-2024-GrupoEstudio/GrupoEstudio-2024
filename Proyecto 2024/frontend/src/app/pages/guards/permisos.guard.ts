import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class permisosguard implements CanActivate { 

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.hasUser()) {
      return true;
    }

    if (confirm('Necesitas iniciar sesión para acceder al carrito. ¿Deseas ingresar?')) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); 
    }

    return false;
  }

  hasUser(): boolean {
    
    return false;
  }
}
