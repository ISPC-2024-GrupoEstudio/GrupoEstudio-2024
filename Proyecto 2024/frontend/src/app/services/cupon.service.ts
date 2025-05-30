import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cupon {
  id: number;
  nombre: string;
  descripcion: string;
  tipo_descuento: string;
  valor_descuento: number;
  imagen_url: string;
  fecha_vencimiento: string;
}

@Injectable({
  providedIn: 'root'
})
export class CuponService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private obtenerToken(): string | null {
      return localStorage.getItem('access_token');
  }

  getCupones(): Observable<Cupon[]> {
      const token = this.obtenerToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<Cupon[]>(`${this.apiUrl}/cupones/`, { headers });
  }

  // Ajuste para incluir el nombre de usuario en la URL
  getMisCupones(nombre_usuario: string): Observable<Cupon[]> {
      const token = this.obtenerToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<Cupon[]>(`${this.apiUrl}/mis-cupones/${nombre_usuario}/`, { headers });
  }

  agregarCupon(username: string, cuponId: number): Observable<any> {
      const token = this.obtenerToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(
          `${this.apiUrl}/mis-cupones/`,
          { username: username, cupon_id: cuponId },
          { headers }
      );
  }

  // eliminarCupones(nombre_usuario: string): Observable<any> {
  //   const token = this.obtenerToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.delete(`${this.apiUrl}/mis-cupones/${nombre_usuario}/`, { headers });
  // }
  eliminarCupones(nombre_usuario: string): Observable<any> {
    const token = this.obtenerToken();

    if (!token) {
      console.error('No hay token disponible para eliminar cupones.');
      throw new Error('Usuario no autenticado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/mis-cupones/${nombre_usuario}/`, { headers });
  }


}

  