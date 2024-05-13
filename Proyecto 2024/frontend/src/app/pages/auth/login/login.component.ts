import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email= new FormControl("");
  password= new FormControl("");
  emailError= "";
  passwordError="";

  constructor(private router:Router){}


  public autenticar() {
        let valid = true;
        if (this.email.value === null || this.password.value === null){
          valid= false;
          return;
        }

        // Validación de correo electrónico
        if (!/^\S+@\S+\.\S+$/.test(this.email.value)) {
          this.emailError = 'Por favor, ingrese un correo electrónico válido.';
          valid = false;
        } else {
          this.emailError = '';
        }

        // Validación de contraseña
        if (this.password.value.length < 6 || this.password.value.length > 20) {
          this.passwordError = 'La contraseña debe tener entre 6 y 20 caracteres.';
          valid = false;
        } else {
          this.passwordError = '';
        }

        if (!valid) {
        } else {
          alert("Iniciando sesión exitosamente");
          this.router.navigateByUrl("/");
        }
  }
}
