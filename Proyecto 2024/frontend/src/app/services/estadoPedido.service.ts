import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IEstadoPedido } from "../models/estadoPedido.interface";

@Injectable({
    providedIn: 'root'
})

export class EstadoPedidoService {
    
    constructor(private readonly httpClient:HttpClient){}

    getEstadoPedido():Observable<IEstadoPedido[]>{
        const url = 'http://127.0.0.1:8000/api/estadoPedidos/';
        return this.httpClient.get<IEstadoPedido[]>(url)

    }
}