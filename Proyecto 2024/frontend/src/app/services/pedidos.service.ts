import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPedido } from '../models/pedido.interface'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { filter, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  usuario = ""

  constructor (private readonly httpClient:HttpClient, private usuarioPedido: AuthService){
  }
  getPedidos(): Observable<IPedido[]> {
    const url = `${this.apiUrl}/pedidos/`;
    return this.httpClient.get<IPedido[]>(url)
  }

  getUsuario(): Observable<string> {
    return this.usuarioPedido.getUsername().pipe(
      take(1), // Solo toma el primer valor emitido por el observable
      filter(username => !!username), // Filtra valores nulos o vacíos
      map(username => username!) // Obtiene el valor real del nombre de usuario
    );
  }

  
}
