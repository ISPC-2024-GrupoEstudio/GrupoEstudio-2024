import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducto } from '../models/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private readonly httpClient : HttpClient) { }

   getProducts(): Observable<IProducto[]> {
    const url = `${this.apiUrl}/productos/`;
    return this.httpClient.get<IProducto[]>(url);
  }

}
