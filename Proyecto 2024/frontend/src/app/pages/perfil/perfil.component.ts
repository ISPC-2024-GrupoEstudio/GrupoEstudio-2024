import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { PerfilService } from '../../services/perfil.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { Subscription } from 'rxjs';

declare var bootstrap: any; // Importar bootstrap para usar el modal

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, EditarPerfilComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit, OnDestroy {
  username: string | null = null;
  infoUsuario: any = null;
  cargandoImagen: boolean = false;
  cargandoPerfil: boolean = true;
  errorCarga: string | null = null;
  mostrarMensajeExito: boolean = false;
  private modal: any = null;
  
  // Subscripciones para liberarlas al destruir el componente
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private perfilService: PerfilService,
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatosPerfil();
  }

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones al salir del componente
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private cargarDatosPerfil(): void {
    this.cargandoPerfil = true;
    this.errorCarga = null;
    
    const usernameSub = this.authService.getUsername().subscribe(username => {
      if (!username) {
        this.errorCarga = "No se encontró información de usuario. Por favor, inicie sesión.";
        this.cargandoPerfil = false;
        return;
      }

      this.username = username;

      const token = localStorage.getItem('access_token');
      if (!token) {
        this.errorCarga = "No se encontró token de autenticación. Por favor, inicie sesión nuevamente.";
        this.cargandoPerfil = false;
        return;
      }

      const perfilSub = this.perfilService.obtenerPerfil(username, token).subscribe({
        next: (data) => {
          this.infoUsuario = data;

          // Guardar datos en servicios
          this.userService.setUsuarioData(this.infoUsuario.nombre_usuario, this.infoUsuario.fotoPerfil);
          
          if (this.infoUsuario.fotoPerfil) {
            this.authService.actualizarFotoPerfil(this.infoUsuario.fotoPerfil);
          }
          
          this.cargandoPerfil = false;
        },
        error: (error) => {
          this.errorCarga = "Error al cargar los datos del perfil.";
          this.cargandoPerfil = false;
        }
      });
      
      this.subscriptions.push(perfilSub);
    });
    
    this.subscriptions.push(usernameSub);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && this.username) {
      // Activar spinner
      this.cargandoImagen = true;

      this.subirImagenACloudinary(file).then((url) => {
        if (url) {
          this.actualizarFotoPerfil(url);
        } else {
          // Si hay un error, se desactiva el spinner
          this.cargandoImagen = false;
          alert("Error al subir la imagen. Inténtelo de nuevo.");
        }
      });
    }
  }

  async subirImagenACloudinary(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'perfil_unsigned');
    formData.append('cloud_name', 'dgql9nx7t');

    try {
      const response: any = await this.http.post('https://api.cloudinary.com/v1_1/dgql9nx7t/image/upload', formData).toPromise();
      return response.secure_url;
    } catch (error) {
      return null;
    }
  }

  actualizarFotoPerfil(url: string): void {
    const token = localStorage.getItem('access_token');
    if (!this.username || !token) {
      this.cargandoImagen = false;
      alert("Error de autenticación. Por favor, inicie sesión nuevamente.");
      return;
    }
    
    const dataActualizada = {
      ...this.infoUsuario, 
      fotoPerfil: url
    };

    this.perfilService.actualizarPerfil(this.username, dataActualizada, token).subscribe({
      next: (data) => {
        this.infoUsuario = data;

        // Actualizar en todos los servicios
        this.authService.actualizarFotoPerfil(this.infoUsuario.fotoPerfil);
        this.userService.setUsuarioData(this.infoUsuario.nombre_usuario, this.infoUsuario.fotoPerfil);
        
        this.cargandoImagen = false;
      },
      error: (error) => {
        this.cargandoImagen = false;
        alert("Error al actualizar la imagen de perfil.");
      }
    });
  }

  onImageLoad(): void {
    if (this.cargandoImagen) {
      this.cargandoImagen = false;
    }
  }

  onImageError(): void {
    this.cargandoImagen = false;
    // Mostrar imagen por defecto o mensaje
  }

  abrirModal(): void {
    const modalElement = document.getElementById('editarPerfilModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
      this.modal.show();
    }
  }

  cerrarModal(): void {
    const modalElement = document.getElementById('editarPerfilModal');
    if (this.modal && modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();

      // Esperar que el modal se cierre completamente
      setTimeout(() => {
        this.mostrarMensajeExito = true;
        this.cargarDatosPerfil(); // Recarga los datos del usuario
        setTimeout(() => {
          this.mostrarMensajeExito = false;
        }, 3000); // Oculta el mensaje de éxito después de 3 segundos
      }, 300); // Delay para asegurarse que el modal desaparezca visualmente
    }
  }
}