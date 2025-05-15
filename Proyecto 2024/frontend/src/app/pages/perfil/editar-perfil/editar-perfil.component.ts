import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit, OnDestroy {
  @Output() formularioGuardado = new EventEmitter<boolean>();

  perfilForm!: FormGroup;
  username!: string;
  cargando: boolean = true;
  error: string | null = null;
  submitted: boolean = false;
  
  // Suscripciones para liberarlas al destruir el componente
  private suscripciones: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    // Inicializar formulario con valores vacíos
    this.inicializarFormulario();
    
    // Cargar datos del usuario actual
    this.cargarDatosUsuario();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.perfilForm.controls;
  }

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones para evitar memory leaks
    this.suscripciones.forEach(sub => sub.unsubscribe());
  }

  //Validador personalizado solo letras y espacios
  soloLetrasValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if(!value) return null;

    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    return soloLetrasRegex.test(value) ? null : { soloLetras: true };
  }

  // Validador para número de teléfono (10 dígitos)
  telefonoValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    // Convertir a string para la validación de formato
    const valueStr = value.toString();
    
    // Verificar que sea solo dígitos y tenga exactamente 10 caracteres
    const telefonoRegex = /^\d{10}$/;
    
    if (!telefonoRegex.test(valueStr)) {
      return { telefono: true };
    }
    
    // Verificar que sea un número válido cuando se convierte
    const num = parseInt(valueStr, 10);
    if (isNaN(num)) {
      return { telefonoInvalido: true };
    }
    
    return null;
  }

  // Validador para la dirección (al menos un número y 3 caracteres mínimo)
  direccionValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    if (value.length < 3) return { minLength: true };
    
    // Verificar que contenga al menos un número
    const contieneDiagitos = /\d/.test(value);
    if (!contieneDiagitos) return { requiresNumber: true };
    
    // Verificar que no contenga símbolos especiales (excepto espacios y caracteres comunes en direcciones)
    const noSimbolosRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\.,#\-/]+$/;
    return noSimbolosRegex.test(value) ? null : { noSimbolos: true };
  }

  // Validador para DNI (exactamente 8 dígitos)
  dniValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    const dniRegex = /^\d{8}$/;
    return dniRegex.test(value) ? null : { dni: true };
  }

  private inicializarFormulario(): void {
    this.perfilForm = this.fb.group({
      nombre: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(100), 
        this.soloLetrasValidator
      ]],
      apellido: ['',[Validators.required, this.soloLetrasValidator]],
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      telefono: ['', [
        Validators.required, 
        this.telefonoValidator
      ]],
      direccion: ['', [
        Validators.required, 
        this.direccionValidator
      ]],
      numero_documento: ['', [
        Validators.required, 
        this.dniValidator
      ]]
    });
    
    // Resetear estados
    this.cargando = true;
    this.error = null;
  }

  private cargarDatosUsuario(): void {
    // Obtener el nombre de usuario actual
    const usernameSub = this.userService.getNombreUsuario().subscribe(username => {
      if (!username) {
        this.error = "No se encontró el nombre de usuario. Por favor, inicie sesión nuevamente.";
        this.cargando = false;
        return;
      }
      
      this.username = username;
      
      // Obtener los datos del usuario actual
      const userDataSub = this.userService.getUsuario(username).subscribe({
        next: (data) => {
          // Actualizar el formulario con los datos obtenidos
          this.perfilForm.patchValue({
            nombre: data.nombre || '',
            apellido: data.apellido || '',
            email: data.email || '',
            telefono: data.telefono ? data.telefono.toString() : '',
            direccion: data.direccion || '',
            numero_documento: data.numero_documento ? data.numero_documento.toString() : ''
          });
          this.cargando = false;
        },
        error: (err) => {
          this.error = "No se pudieron cargar los datos del usuario.";
          this.cargando = false;
        }
      });
      
      this.suscripciones.push(userDataSub);
    });
    
    this.suscripciones.push(usernameSub);
  }

  guardarCambios(): void {
    this.submitted = true;
    if (this.perfilForm.invalid) return;

    const formData = { ...this.perfilForm.value };

    if (formData.telefono) {
      const telefonoLimpio = formData.telefono.toString().replace(/\D/g, '');
      if (!/^\d{10}$/.test(telefonoLimpio)) {
        this.error = "El número de teléfono debe contener exactamente 10 dígitos";
        return;
      }
      const telefonoNum = Number(telefonoLimpio);
      formData.telefono = Number.isSafeInteger(telefonoNum) ? telefonoNum : telefonoLimpio;
    }

    this.cargando = true;
    this.userService.actualizarUsuario(this.username, formData).subscribe({
      next: () => {
        this.cargando = false;
        this.submitted = false;
        setTimeout(() => {
          this.formularioGuardado.emit(true); // El padre cierra el modal y muestra mensaje
        }, 500); // breve espera para evitar que el form se vea un instante más
      },
      error: (err) => {
        this.error = "Error al actualizar perfil.";
        this.cargando = false;
      }
    });
  }
}