import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  username: string | null = null;
  infoUsuario: any = null; //aca se guarda la info del usuario

  constructor(private authService: AuthService){}

  ngOnInit():void{
    this.authService.getUsername().subscribe((username) => {
      if(username){
        this.username = username;
        this.authService.getUserPerfil(username).subscribe({
          next: (data) => {
            this.infoUsuario = data;
            console.log('Datos de perfil: ', this.infoUsuario);
          },
          error: (error) => {
            console.error('Error al obtener los datos del perfil:', error);
          }
        })
      }
    })
  }
}
