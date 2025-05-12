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
        // Asegúrate de que el token se haya guardado tras el login
        return localStorage.getItem('access_token'); // O el método que uses para almacenar el token
      }
  
      getCupones(): Observable<Cupon[]> {
        const token = this.obtenerToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<Cupon[]>(`${this.apiUrl}/cupones/`, { headers });
      }
    
      getMisCupones(): Observable<number[]> {
        const token = this.obtenerToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<number[]>(`${this.apiUrl}/mis-cupones/`, { headers });
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
    
  }
  