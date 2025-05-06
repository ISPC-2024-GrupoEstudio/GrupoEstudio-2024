import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUsuario } from "../models/usuario.interface";
import { Observable, of, tap, BehaviorSubject, catchError } from "rxjs";
@Injectable({ providedIn: 'root' })


@Injectable()
export class AuthService {
    private apiUrl = 'http://127.0.0.1:8000/api/auth/'; 
    private tokenKey = 'access_token';  // Puedes cambiar la clave que usas para guardar el token

    //BehaviorSubject para los datos del usuario
    private nombreUsuarioSubject = new BehaviorSubject<string | null>(localStorage.getItem('user'));
    nombreUsuario$ = this.nombreUsuarioSubject.asObservable();

    private fotoPerfilSubject = new BehaviorSubject<string | null>(localStorage.getItem('fotoPerfil'));
    fotoPerfil$ = this.fotoPerfilSubject.asObservable();

    constructor(private readonly httpClient:HttpClient){ 
        // Intentar cargar la foto del perfil al inicializar el servicio si hay un usuario
        this.cargarFotoPerfilAlIniciar();
    }

    // Método para cargar la foto de perfil al iniciar si existe un usuario
    private cargarFotoPerfilAlIniciar(): void {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem(this.tokenKey);
        
        if (username && token) {
            this.getUserPerfil(username).subscribe({
                next: (perfil) => {
                    if (perfil && perfil.fotoPerfil) {
                        this.actualizarFotoPerfil(perfil.fotoPerfil);
                    }
                },
                error: (error) => {
                    console.error('Error al cargar foto de perfil al iniciar:', error);
                }
            });
        }
    }

    // Método para actualizar la foto de perfil
    actualizarFotoPerfil(url: string): void {
        this.fotoPerfilSubject.next(url);
        localStorage.setItem('fotoPerfil', url);
    }

    login(username:string, password:string): Observable<any>  {
        const loginData = { username, password };
        console.log('entrando')
        return this.httpClient.post<any>(`${this.apiUrl}token/`, loginData).pipe(
            tap((data: any)  => {
                console.log('Accediendo al token de acceso:', data);
                if (data.access) {
                    console.log('Token de acceso:', data.access);
                    localStorage.setItem('access_token', data.access);
                    localStorage.setItem('refresh_token', data.refresh);
                    localStorage.setItem('user', username);
                    this.nombreUsuarioSubject.next(username);
                    console.log( 'tokennnnn')

                    // Asegurarnos de que se obtenga la foto de perfil al iniciar sesión
                    this.getUserPerfil(username).subscribe({
                        next: (perfil) => {
                            if (perfil) {
                                const foto = perfil.fotoPerfil || '';
                                this.actualizarFotoPerfil(foto);
                                console.log('Foto de perfil cargada correctamente:', foto);
                            }
                        },
                        error: (error) => {
                            console.error('Error al obtener la foto de perfil durante login:', error);
                        }
                    });
                    
                    console.log('Token guardado en localStorage:', localStorage.getItem('access_token'));
                }
            }),
            catchError(error => {
                console.error('Error durante el login:', error);
                throw error;
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
        localStorage.removeItem('fotoPerfil');
        this.nombreUsuarioSubject.next(null);
        this.fotoPerfilSubject.next(null);
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

    refreshToken(refreshToken: string): Observable<any> {
        return this.httpClient.post('http://localhost:8000/api/auth/token/refresh/', { refresh: refreshToken });
    }

    getUserPerfil(username: string): Observable<any>{
        const token = this.getAccessToken();
        if (!token) {
            console.error('No se encontró token para obtener perfil');
            return of(null);
        }
        
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.httpClient.get(`${this.apiUrl}usuarios/${username}/`, { headers }).pipe(
            catchError(error => {
                console.error('Error al obtener perfil de usuario:', error);
                return of(null);
            })
        );
    }
}