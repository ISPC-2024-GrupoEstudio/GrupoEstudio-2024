import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})

export class ContactoComponent implements OnInit {
  email: string = "petboutique@gmail.com";
  formulario: FormGroup;
  mensajeExito: boolean = false;
  ocultandoMensaje: boolean = false;
  username: string | null = null;  // Asegúrate de tener una propiedad para el username

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10,15}')]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    if (this.authService.isAuthenticated()) {
      this.authService.getUsername().subscribe((username) => {  // Obtener el username
        if (username) {
          this.username = username;
          this.authService.getUserPerfil(this.username).subscribe(  // Pasar username al método
            (data) => {
              if (data) {
                this.formulario.patchValue({
                  nombre: data.nombre || '',
                  telefono: data.telefono || '',
                  email: data.email || ''
                });
              }
            },
            (error) => {
              console.error('Error al cargar los datos del usuario', error);
            }
          );
        }
      });
    }
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      this.mensajeExito = true;
      this.formulario.reset();

      setTimeout(() => {
        this.ocultandoMensaje = true;
        setTimeout(() => {
          this.mensajeExito = false;
          this.ocultandoMensaje = false;
        }, 500); // duración del fade-out
      }, 3000);
    }
  }

  cerrarPopup() {
    this.ocultandoMensaje = true;
    setTimeout(() => {
      this.mensajeExito = false;
      this.ocultandoMensaje = false;
    }, 500);
  }
}

