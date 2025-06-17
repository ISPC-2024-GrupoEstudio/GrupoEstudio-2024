import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Direccion } from '../pages/perfil/editar-perfil/direccion.model';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private apiUrl = 'http://127.0.0.1:8000/api/api'; // URL base corregida

  constructor(private http: HttpClient) {}

  // Guardar dirección (POST)
//   guardarDireccion(direccion: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/direcciones/`, direccion);
//   }
  // guardarDireccion(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/direcciones/`, data); // llama a /api/direcciones/
  // }
  // guardarDireccion(data: { usuario: string; direccion: string }): Observable<any> {
  //   return this.http.post('http://127.0.0.1:8000/api/api/direcciones/', data);
  // }



  // // Obtener direcciones por usuario (GET)
  // obtenerDirecciones(username: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/direcciones/${username}`);
  // }

  getDirecciones(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(`${this.apiUrl}/direcciones/`);
  }

  agregarDireccion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/direcciones/`, data);
  }

  eliminarDireccion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/direcciones/${id}/`);
  }

}

