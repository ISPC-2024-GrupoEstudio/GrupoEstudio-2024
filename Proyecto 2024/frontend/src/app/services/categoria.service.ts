import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICategoriaProducto } from "../models/categoria.interface";
import { Observable } from "rxjs";

@Injectable()
export default class CategoriaService {

    constructor(private readonly httpClient : HttpClient) { }

    getCategorias() :Observable<ICategoriaProducto[]>   {
        const url = 'http://127.0.0.1:8000/api/v1/categorias/'
        return this.httpClient.get<ICategoriaProducto[]>(url)
    }

}