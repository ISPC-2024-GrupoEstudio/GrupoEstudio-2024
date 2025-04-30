import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PerfilService{
    private baseUrl = 'http://127.0.0.1:8000/api/auth/usuarios';

    constructor(private http: HttpClient) { }

    //Obtener perfil por nombre_usuario
    obtenerPerfil(nombreUsuario: string, token:string): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.baseUrl}/${nombreUsuario}/`, { headers});
    }

    //Actualizar perfil por nombre de usuario
    actualizarPerfil(nombreUsuario:string, datos:any, token: string): Observable<any>{
       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
       return this.http.put(`${this.baseUrl}/${nombreUsuario}/`, datos, { headers });
    }
}