import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducto } from '../models/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private readonly httpClient : HttpClient) { }

  getProducts() : Observable<IProducto[]> {
    const url = 'http://127.0.0.1:8000/api/v1/productos/'
    return this.httpClient.get<IProducto[]>(url)
  }

}
