import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IFormaDePago } from "../models/formaDePago.interface";

@Injectable()
export class FormaDePagoService {
    constructor(private readonly httpClient:HttpClient){ }

    getFormaDePago(): Observable<IFormaDePago[]> {
        const url = 'http://127.0.0.1:8000/api/v1/formaDePago/'
        return this.httpClient.get<IFormaDePago[]>(url)
    }
}