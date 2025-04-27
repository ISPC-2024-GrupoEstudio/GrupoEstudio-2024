import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {

  form:FormGroup;
  loginError?:string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ){
    this.form = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    })
  }

  get Password() {
    return this.form.get("password");
  }

  get Username() {
    return this.form.get("username");
  }

  public onFormSubmit(event:Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.login();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private login() {
    const username = this.Username?.value;
    const password = this.Password?.value;

    this.authService.login(this.Username?.value, this.Password?.value).subscribe((data:any) => {
      console.log('Login exitoso. Token recibido:', data.access);
      if (data.access) {
        localStorage.setItem('access_token', data.access);  // Guarda el token en localStorage
        localStorage.setItem('user', username);  // Guarda el usuario
        console.log('Token guardado en localStorage:', localStorage.getItem('access_token'));  // Verifica que el token se guardó
        this.router.navigate(['/']);  // Redirige a la página de inicio u otra página
      } else {
        console.error('No se recibió token de acceso');
      }
    }, (error) => {
      console.error('Error en el login:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      this.loginError = "Credenciales incorrectas";
    });
  }
}
