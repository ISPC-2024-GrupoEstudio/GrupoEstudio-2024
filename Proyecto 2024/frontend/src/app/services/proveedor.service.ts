import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProveedor } from "../models/proveedor.interface";
import { Observable } from "rxjs";

@Injectable()
export default class ProveedorService {

    constructor(private readonly httpClient : HttpClient) { }

    getProveedores() :Observable<IProveedor[]>   {
        const url = 'http://127.0.0.1:8000/api/v1/proveedores/'
        return this.httpClient.get<IProveedor[]>(url)
    }

}