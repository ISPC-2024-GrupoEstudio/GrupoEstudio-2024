// cupon.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CuponService {
  // private apiUrl = 'http://127.0.0.1:8000/api/mis-cupones/';
  // private apiUrl = 'http://127.0.0.1:8000/api/cupones/';
  private apiUrl = 'http://127.0.0.1:8000/api/listar-cupones/';

  constructor(private http: HttpClient) {}

  // getAuthHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('access_token');
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  // }

  // obtenerMisCupones(): Observable<any> {
  //   return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  // }

  // guardarCuponSeleccionado(cuponData: any): Observable<any> {
  //   const cuponId = cuponData.id || cuponData.cupon?.id;
  
  //   if (!cuponId) {
  //     throw new Error('ID del cupón no encontrado');
  //   }
  
  //   const body = {
  //     cupon: cuponId
  //   };
  //   return this.http.post(this.apiUrl, body, { headers: this.getAuthHeaders() });
  // }
  // Método para obtener los headers de autenticación con el token
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Método para obtener los cupones del backend
  obtenerMisCupones(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Método para guardar un cupón seleccionado
  guardarCuponSeleccionado(cuponData: any): Observable<any> {
    const cuponId = cuponData.id || cuponData.cupon?.id;
  
    if (!cuponId) {
      throw new Error('ID del cupón no encontrado');
    }
  
    const body = {
      cupon: cuponId
    };
    return this.http.post(this.apiUrl, body, { headers: this.getAuthHeaders() });
  }
  
}
