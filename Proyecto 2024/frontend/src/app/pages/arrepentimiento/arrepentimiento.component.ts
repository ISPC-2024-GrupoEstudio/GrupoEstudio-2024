import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArrepentimientoService } from '../../services/arrepentimiento.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-arrepentimiento',
  templateUrl: './arrepentimiento.component.html',
  styleUrls: ['./arrepentimiento.component.css'],
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule] 
})
export class ArrepentimientoComponent implements OnInit {  // <-- implementamos OnInit
  arrepentimientoForm: FormGroup;
  mensajeEnviado = false;
  errorMsg = '';
  successMsg = '';
  mostrarModal = false;

  constructor(
    private fb: FormBuilder,
    private arrepentimientoService: ArrepentimientoService,
    private authService: AuthService  // <-- inyectamos AuthService
  ) {
    this.arrepentimientoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numeroPedido: ['', Validators.required],
      fechaCompra: ['', Validators.required],
      telefono: ['', Validators.required], 
      motivo: ['']
    });
  }

  ngOnInit(): void {
    this.autocompletarUsuario();
  }

  autocompletarUsuario() {
    if (this.authService.isAuthenticated()) { 
      this.authService.getUsername().subscribe(username => {
        if (username) {
          this.authService.getUserPerfil(username).subscribe(
            (perfil) => {
              if (perfil) {
                this.arrepentimientoForm.patchValue({
                  nombre: perfil.nombre || '',
                  email: perfil.email || ''
                });
              }
            },
            (error) => {
              console.error('Error al obtener perfil de usuario', error);
            }
          );
        }
      });
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  onSubmit() {
    this.mensajeEnviado = true;
    this.errorMsg = '';
    this.successMsg = '';

    if (this.arrepentimientoForm.invalid) {
      this.errorMsg = 'Por favor completá todos los campos obligatorios.';
      return;
    }

    const formData = this.arrepentimientoForm.value;
    console.log('Datos enviados al backend:', formData);

    this.arrepentimientoService.enviarSolicitud(formData).subscribe({
      next: () => {
        this.successMsg = 'Tu solicitud fue recibida y será procesada. ¡Gracias!';
        this.arrepentimientoForm.reset();
        this.mostrarModal = true;
        this.mensajeEnviado = false;
      },
      error: (err) => {
        this.errorMsg = 'Ocurrió un error al enviar la solicitud. Intentá más tarde.';
        console.error('Error detallado del backend:', err.error);
      }
    });
  }
}
