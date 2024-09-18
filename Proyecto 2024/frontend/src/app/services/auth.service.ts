import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUsuario } from "../models/usuario.interface";
import { BehaviorSubject, Observable, of } from "rxjs";

const EMPTY_USER:IUsuario = {
    nombre: "",
    apellido: "",
    nombre_usuario: "",
    email: "",
    password: "",
    fotoPerfil: "",
    id_tipo_documento: 0,
    numero_documento: 0
}

@Injectable({
    providedIn: 'root',

  })
  export class AuthService {
    constructor(private readonly httpClient:HttpClient){ }

    private usuarioInfoSubject: BehaviorSubject<IUsuario> = new BehaviorSubject<IUsuario>(EMPTY_USER);
    public usuarioInfo: Observable<IUsuario> = this.usuarioInfoSubject.asObservable();

    login(username:string, password:string) {
        const url = 'http://127.0.0.1:8000/api/auth/login/'
        return this.httpClient.post(url, {username, password})
    }

    register(usuario:IUsuario) {
        const url = 'http://127.0.0.1:8000/auth/register/'
        return this.httpClient.post(url, usuario)
    }

    logout() {
        localStorage.removeItem("user")
    }

    isAuthenticated() {
        return !!localStorage.getItem("user")
    }

    getUsername(): Observable<string | null> {
        return of(localStorage.getItem('user'));
    }

    getUser(username:string) {
        const url = 'http://127.0.0.1:8000/api/usuarios/'+username
        return this.httpClient.get<IUsuario>(url);
    }

    setUserInfo(usuario: IUsuario) {
        console.log("> EL USUARIO", usuario);
        this.usuarioInfoSubject.next(usuario);
    }

    getUserInfo(): IUsuario {
        return this.usuarioInfoSubject.value;
    }

    updateUserInfo() {
        const username = localStorage.getItem("user");
        this.getUser(username!).subscribe((user) => {
            this.setUserInfo(user);
        })
    }

}