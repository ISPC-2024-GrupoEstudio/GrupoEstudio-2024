import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = 'http://127.0.0.1:8000/api/'; // Cambia esto a la URL de tu API

    private fotoPerfil: string | null = null;
    private nombreUsuarioSubject = new BehaviorSubject<string | null>(null);

    private usuarioActualSubject = new BehaviorSubject<string | null
    >(null);

    constructor(private http: HttpClient) { 
        this.cargarDatosDesdeStorage();
    }

    private cargarDatosDesdeStorage(): void {
        const storedUsername = localStorage.getItem('nombreUsuario');
        
        if (storedUsername) {
            this.nombreUsuarioSubject.next(storedUsername);
            this.usuarioActualSubject.next(storedUsername);
        }
    }

    setUsuarioData(nombreUsuario: string, fotoPerfil:string):void{
         // Detectar cambio de usuario
         const usuarioAnterior = this.usuarioActualSubject.value;
         if (usuarioAnterior !== nombreUsuario) {
             console.log(`Cambio de usuario detectado: ${usuarioAnterior} -> ${nombreUsuario}`);
             // Limpiar caché de datos anteriores cuando cambia el usuario
             this.limpiarDatosUsuarioAnterior();
         }
         
         // Actualizar BehaviorSubjects
         this.nombreUsuarioSubject.next(nombreUsuario);
         this.usuarioActualSubject.next(nombreUsuario);
 
         // Guardar en localStorage
         localStorage.setItem('nombreUsuario', nombreUsuario);
    }

    // Método para limpiar datos al cerrar sesión
    limpiarDatosUsuario(): void {
        this.nombreUsuarioSubject.next(null);
        this.usuarioActualSubject.next(null);
        
        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('fotoPerfil');
        localStorage.removeItem('access_token');
        // Limpiar cualquier otra información de usuario almacenada
    }

    // Método para limpiar datos al cambiar de usuario
    private limpiarDatosUsuarioAnterior(): void {
        // Aquí puedes limpiar caché o datos que no deberían persistir entre usuarios
        console.log('Limpiando datos del usuario anterior');
        // Si tienes algún tipo de caché de información de perfil, límpiala aquí
    }

    getFotoPerfil(): string | null {
        return this.fotoPerfil || localStorage.getItem('fotoPerfil');
    }

    getNombreUsuario(): Observable<string | null> {
        return this.nombreUsuarioSubject.asObservable();
    }

    getUsuario(username: string): Observable<any>{
        console.log(`Obteniendo datos para el usuario: ${username}`);
        return this.http.get(`${this.apiUrl}auth/usuarios/${username}/`);
    }

    actualizarUsuario(username: string, datos: any): Observable<any>{
        return this.http.put(`${this.apiUrl}auth/usuarios/${username}/`, datos);
    }

}