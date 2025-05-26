import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArrepentimientoRequest } from '../pages/arrepentimiento/arrepentimiento-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArrepentimientoService {
  private apiUrl = 'http://localhost:8000/api/arrepentimiento/';

  constructor(private http: HttpClient) {}

  enviarSolicitud(data: ArrepentimientoRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
