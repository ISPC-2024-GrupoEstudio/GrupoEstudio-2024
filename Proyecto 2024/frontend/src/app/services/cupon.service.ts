import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CuponService {
  // Cambié la URL al endpoint correcto
  private apiUrl = 'http://127.0.0.1:8000/api/listar-cupones/';
  private misCuponesUrl = 'http://127.0.0.1:8000/api/mis-cupones/';
  private guardarCuponUrl = 'http://127.0.0.1:8000/api/guardar-cupon/';

  constructor(private http: HttpClient) {}

  // Método para obtener los headers de autenticación con el token
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Método para obtener todos los cupones del backend
  obtenerMisCupones(): Observable<any> {
    return this.http.get<any[]>(this.misCuponesUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Método para guardar un cupón seleccionado

  guardarCuponSeleccionado(cuponData: any): Observable<any> {
    const cuponId = cuponData.id || cuponData.cupon?.id;
  
    if (!cuponId) {
      throw new Error('ID del cupón no encontrado');
    }
  
    const body = {
      cupon_id: cuponId  // 👈 este cambio es clave
    };
    return this.http.post(this.guardarCuponUrl, body, {
      headers: this.getAuthHeaders(),
    });
  }
  
  obtenerCuponesDisponibles(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }
  
}
