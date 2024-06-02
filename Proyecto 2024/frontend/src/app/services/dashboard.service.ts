import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor (private readonly httpClient:HttpClient){

  }

  public getPedidos(): {
    const url = "http://127.0.0.1:8000/api/v1/pedidos"
    return [ this.httpClient.get(url)    ]
  }

  
}
