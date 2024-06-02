import { Injectable, } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable ({
  providedIn: 'root'                              
})
export class proteccionguard implements CanActivate {
  canActivate (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> |boolean |UrlTree {
      if (this.hasUser()){ 
 
      return true;
    }
    //redireccion a login
    alert('TU NO TIENES PERMISO')
    return false
  }

hasUser (): boolean {
  return false;
  }
}