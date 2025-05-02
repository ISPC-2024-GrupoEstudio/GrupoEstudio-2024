import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { MinicartComponent } from '../../pages/cart/minicart/minicart.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MinicartComponent],
  providers: [AuthService],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit, OnDestroy {
  public nombreUsuario = "";
  public fotoPerfil = "";
  
  private fotoSubscription: Subscription | null = null;
  private nombreSubscription: Subscription | null = null;
  
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  ngOnInit(): void {
    // Suscripción a cambios en el nombre de usuario
    this.nombreSubscription = this.authService.nombreUsuario$.subscribe(nombre => {
      if (nombre) {
        this.nombreUsuario = nombre;
        
        // Si tenemos un nombre de usuario pero no foto, intentamos cargar la foto del perfil
        if (!this.fotoPerfil) {
          this.cargarFotoPerfil();
        }
      }
    });
    
    // Suscripción a cambios en la foto de perfil
    this.fotoSubscription = this.authService.fotoPerfil$.subscribe(foto => {
      if (foto) {
        this.fotoPerfil = foto;
      } else {
        // Si no hay foto en el observable, intentar cargarla del localStorage
        const fotoLocal = localStorage.getItem('fotoPerfil');
        if (fotoLocal) {
          this.fotoPerfil = fotoLocal;
        }
      }
    });
    
    // Inicialización de datos al cargar el componente
    this.inicializarDatos();
  }

  // Método para cargar datos iniciales
  private inicializarDatos() {
    // Obtener nombre de usuario desde localStorage
    const username = localStorage.getItem('user');
    if (username) {
      this.nombreUsuario = username;
      
      // Si el usuario está autenticado pero no tenemos foto, intentamos cargarla
      if (this.isAuthenticated && !this.fotoPerfil) {
        this.cargarFotoPerfil();
      }
    }
    
    // Obtener foto de perfil desde localStorage
    const fotoLocal = localStorage.getItem('fotoPerfil');
    if (fotoLocal) {
      this.fotoPerfil = fotoLocal;
    }
  }

  // Método para cargar la foto de perfil desde el backend
  private cargarFotoPerfil() {
    const username = localStorage.getItem('user');
    if (username && this.isAuthenticated) {
      this.authService.getUserPerfil(username).subscribe({
        next: (perfil) => {
          if (perfil && perfil.fotoPerfil) {
            this.fotoPerfil = perfil.fotoPerfil;
            localStorage.setItem('fotoPerfil', perfil.fotoPerfil);
            this.authService.actualizarFotoPerfil(perfil.fotoPerfil);
          }
        },
        error: (error) => {
          console.error('Error al cargar la foto de perfil:', error);
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.fotoPerfil = '';
    this.router.navigate(['/']);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  
  ngOnDestroy() {
    // Limpieza de suscripciones al destruir el componente
    if (this.fotoSubscription) {
      this.fotoSubscription.unsubscribe();
    }
    if (this.nombreSubscription) {
      this.nombreSubscription.unsubscribe();
    }
  }
}