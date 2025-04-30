import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private fotoPerfil: string | null = null;
    private nombreUsuario: string | null = null;

    setUsuarioData(nombreUsuario: string, fotoPerfil:string):void{
        this.nombreUsuario = nombreUsuario;
        this.fotoPerfil = fotoPerfil;

        //Guardar en localStorage
        localStorage.setItem('nombreUsuario', nombreUsuario)
        localStorage.setItem('fotoPerfil', fotoPerfil);
    }

    getFotoPerfil(): string | null {
        return this.fotoPerfil || localStorage.getItem('fotoPerfil');
    }

    getNombreUsuario(): string | null {
        return this.nombreUsuario || localStorage.getItem('nombreUsuario');
    }
}