import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProductoXPedido } from "../models/productosXPedido.interface";
import { Observable } from "rxjs";

@Injectable()
export class ProductoXPedidoService {

    constructor(private readonly httpClient: HttpClient){}

    getProductoXPedido(): Observable<IProductoXPedido[]> {
        const url = 'http://127.0.0.1:8000/api/v1/productoXPedido/'
        return this.httpClient.get<IProductoXPedido[]>(url)
    }
}