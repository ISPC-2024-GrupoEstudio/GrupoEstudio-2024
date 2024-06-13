import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPedido } from '../models/pedido.interface'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor (private readonly httpClient:HttpClient){
  }
  getPedidos(): Observable<IPedido[]> {
    const url = `${this.apiUrl}/pedidos/`;
    return this.httpClient.get<IPedido[]>(url)
  }


  
}
