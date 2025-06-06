import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IUsuario } from '../../../models/usuario.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  providers: [AuthService],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  form!: FormGroup;
  showPasswordHint = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  registroExitoso: boolean = false;


  constructor(private _formBuilder: FormBuilder, private authService:AuthService, private router: Router) {
    this.form = this._formBuilder.group({
      names: ["", Validators.required],
      lastName: ["", Validators.required],
      tipodni: ["", Validators.required],
      dni: ["",[Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(8), Validators.maxLength(8) ]],
      username: ["",[Validators.required,Validators.minLength(5), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9_-]+$/)  ]],
      email: ["",[Validators.required, Validators.email]],
      password:["",[Validators.required,Validators.minLength(6), Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/)]],
      confirm_password: ["", Validators.required],

  },{ validators: this.passwordsMatchValidator });
  }

  get passwordValidLength(): boolean {
    return this.Password?.value?.length >= 8 && this.Password?.value?.length <= 20;
  }

  get passwordValidUpper(): boolean {
    return /[A-Z]/.test(this.Password?.value);
  }

  get passwordValidLower(): boolean {
    return /[a-z]/.test(this.Password?.value);
  }

  get passwordValidNumber(): boolean {
    return /\d/.test(this.Password?.value);
  }

  get passwordValidSpecial(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.Password?.value);
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirm_password')?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    }
    return null;
  }


  onEnviar(event:Event) {
    event.preventDefault;
    
    const usuario:IUsuario = {
      nombre: this.form.value.names,
      apellido: this.form.value.lastName,
      id_tipo_documento: this.form.value.tipodni,
      numero_documento: this.form.value.dni,
      nombre_usuario: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      fotoPerfil: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    };

    if (this.form.valid) {
      this.authService.register(usuario).subscribe({
        next: (data) => {
          this.registroExitoso = true;
  
          // Espera 2 segundos y luego redirige al login
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 2000);
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          // Podés mostrar mensaje de error también si querés
        }
      });
    } else {
      this.form.markAllAsTouched()
    }
  }

get Names(){
  return this.form.get("names")
}


get Lastname(){
  return this.form.get("lastName")
}

  get Dni(){
    return this.form.get("dni")
  }


  get Username(){
    return this.form.get("username")
  }


  get Password()
  {
  return this.form.get("password");
  }

  get Email()
  {
  return this.form.get("email");
 }

 get ConfirmPsw (){
  return this.form.get("confirm_password")
 }



}