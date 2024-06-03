import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITipoEnvio } from "../models/tipoEnvio.interface";

@Injectable()

export class TipoEnvioService {

    constructor(private readonly httpClient:HttpClient){ }

    getTipoEnvio(): Observable<ITipoEnvio[]> {
        const url = 'http://127.0.0.1:8000/api/v1/tipoEnvio';
        return this.httpClient.get<ITipoEnvio[]>(url)
    }
}