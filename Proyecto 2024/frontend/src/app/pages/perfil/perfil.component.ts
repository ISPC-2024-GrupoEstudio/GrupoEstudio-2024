import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { PerfilService } from '../../services/perfil.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

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
  cargandoImagen: boolean = false;

  constructor(private authService: AuthService, private perfilService: PerfilService,private userService: UserService, private http: HttpClient){}

  ngOnInit():void{
    this.authService.getUsername().subscribe((username) => {
      if(username){
        this.username = username;

        const token = localStorage.getItem('access_token');
        if(token){
          this.perfilService.obtenerPerfil(username, token).subscribe({
            next:(data) => {
              this.infoUsuario = data;
              console.log('Datos de perfil', this.infoUsuario);

              //Guarda el username para el navbar
              this.userService.setUsuarioData(this.infoUsuario.nombre_usuario, this.infoUsuario.fotoPerfil);

              //Actualiza la foto de perfil en authservice
              if(this.infoUsuario.fotoPerfil){
                this.authService.actualizarFotoPerfil(this.infoUsuario.fotoPerfil)
              }

              //Guarda en localstorage
              localStorage.setItem('fotoPerfil', this.infoUsuario.fotoPerfil || '');
              localStorage.setItem('nombreUsuario', this.infoUsuario.nombre_usuario || '');
            },
            error: (error) => {
              console.error('Error al obtener el perfil', error);
            }
          });
        }else {
          console.log("Token JWT no encontrado");
        }
      }
    })
  }

  //Manejo de seleccion de archivos
  onFileSelected(event: any): void{
    const file: File = event.target.files[0];
    if(file && this.username){

      //Activar spinner
      this.cargandoImagen = true;

      this.subirImagenACloudinary(file).then((url) => {
        if(url) {
          this.actualizarFotoPerfil(url);
        }else{
          //si hay un error, se desactiva el spinner
          this.cargandoImagen = false;
        }
      });
    }
  }

  //Subida de imagen a Cloudinary
  async subirImagenACloudinary(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'perfil_unsigned');
    formData.append('cloud_name', 'dgql9nx7t');

    try{
      const response: any = await this.http.post('https://api.cloudinary.com/v1_1/dgql9nx7t/image/upload', formData).toPromise();
      return response.secure_url;
    }catch (error){
      console.log('Error al subir la imagen a Cloudinary', error);
      return null;
    }
  }

  //Actualizar la URL en la BBDD
  actualizarFotoPerfil(url: string):void {
    const token = localStorage.getItem('access_token');
    if(this.username && token){
      const dataActualizada = {
        ...this.infoUsuario, fotoPerfil: url
      };

      this.perfilService.actualizarPerfil(this.username, dataActualizada, token).subscribe({
        next: (data) => {
          this.infoUsuario = data;
          console.log('Imagen actualizada bien: ', data);

          //actualizar foto en el authservice para que el navbar se actualice
          this.authService.actualizarFotoPerfil(this.infoUsuario.fotoPerfil);

          //Tambien actualiza en el UserService
          this.userService.setUsuarioData(this.infoUsuario.nombre_usuario, this.infoUsuario.fotoPerfil);

          //Actualiza en localStorage
          localStorage.setItem('fotoPerfil', this.infoUsuario.fotoPerfil || '');
          localStorage.setItem('nombreUsuario', this.infoUsuario.nombre_usuario || '');

        },
        error: (error) => {
          console.log('Error al actualizar imagen: ', error);
          this.cargandoImagen = false;
        }
      });
    }
  }

  //Se ejecuta cuando la imagen s ecarga completamente
  onImageLoad(): void{
    //se desactiva el spinner si esta en estado de carga
    if(this.cargandoImagen){
      console.log('Imagen cargada completamente');
      this.cargandoImagen = false;
    }
  }

  //Se ejecuta si hay un error al cargar la imagen
  onImageError():void{
    console.error('Error al cargar la imagen');
    this.cargandoImagen = false;
  }

}
