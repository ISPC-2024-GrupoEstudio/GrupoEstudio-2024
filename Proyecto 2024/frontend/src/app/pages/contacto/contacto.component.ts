import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  email:string = "petboutique@gmail.com";

  formulario: FormGroup;
  mensajeExito: boolean = false;
  ocultandoMensaje: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10,15}')]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
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
