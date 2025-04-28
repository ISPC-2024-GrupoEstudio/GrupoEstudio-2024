import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUsuario } from "../models/usuario.interface";
import { Observable, of, tap } from "rxjs";

@Injectable()
export class AuthService {
    private apiUrl = 'http://127.0.0.1:8000/api/auth/'; 
    private tokenKey = 'access_token';  // Puedes cambiar la clave que usas para guardar el token
    constructor(private readonly httpClient:HttpClient){ }

    login(username:string, password:string): Observable<any>  {
        const loginData = { username, password };
        return this.httpClient.post<any>(`${this.apiUrl}token/`, loginData).pipe(
            tap((data: any)  => {
                console.log('Accediendo al token de acceso:', data);  // Verifica la respuesta completa
                if (data.access) {
                    console.log('Token de acceso:', data.access);  // Verifica que el token de acceso esté aquí
                    localStorage.setItem('access_token', data.access);  // Guarda el token
                    localStorage.setItem('refresh_token', data.refresh);  // Guarda el token de refresco
                    localStorage.setItem('user', username);  // Guarda el nombre de usuario
                    console.log('Token guardado en localStorage:', localStorage.getItem('access_token'));  // Verifica que el token se guarda

                }
            })

        );
      }

    register(usuario:IUsuario) {
        const url = 'http://127.0.0.1:8000/api/auth/register/'
        return this.httpClient.post(url, usuario)
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem('user');
    }

    isAuthenticated() {
        return !!localStorage.getItem(this.tokenKey);
    }

    getUsername(): Observable<string | null> {
        return of(localStorage.getItem('user'));
    }

    getAccessToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    private createAuthHeaders(): HttpHeaders {
        const token = this.getAccessToken();
        return new HttpHeaders({
            'Authorization': token ? `Bearer ${token}` : '',
        });
    }

    // Método para realizar una petición con el token JWT
    private requestWithToken(url: string, method: string, body: any = null): Observable<any> {
        const headers = this.createAuthHeaders();
        if (method === 'GET') {
            return this.httpClient.get(url, { headers });
        } else if (method === 'POST') {
            return this.httpClient.post(url, body, { headers });
        }
        // Puedes añadir más métodos HTTP si los necesitas
        return of(null);  // Si no es un método válido, retorna null
    }

}