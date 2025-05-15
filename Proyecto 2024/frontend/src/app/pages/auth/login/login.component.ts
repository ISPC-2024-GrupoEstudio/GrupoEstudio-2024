import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IUsuario } from '../../../models/usuario.interface';

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
  showPasswordHint = false;
  showPassword: boolean = false;
  failedAttempts = 0;
  isLocked = false;
  lockTimeLeft = 0;
  lockDuration = 2 * 60; // 2 minutos en segundos
  lockUntil: number = 0;
  lockInterval?: any;

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

  ngOnInit(): void {
    const storedAttempts = localStorage.getItem('failedAttempts');
    const storedLockUntil = localStorage.getItem('lockUntil');

    if (storedAttempts) this.failedAttempts = parseInt(storedAttempts, 10);
    if (storedLockUntil) {
      this.lockUntil = parseInt(storedLockUntil, 10);
      const now = Date.now();
      if (now < this.lockUntil) {
        this.isLocked = true;
        this.lockTimeLeft = Math.floor((this.lockUntil - now) / 1000);
        this.startLockTimer();
      } else {
        this.clearLockState();
      }
    }
  }


  private login() {
    const username = this.Username?.value;
    const password = this.Password?.value;

    this.authService.login(this.Username?.value, this.Password?.value).subscribe((data:any) => {
      console.log('Login exitoso. Token recibido:', data.access);
      if (data.access) {
        this.clearLockState();
        localStorage.setItem('access_token', data.access);  // Guarda el token en localStorage
        localStorage.setItem('user', username);  // Guarda el usuario
        console.log('Token guardado en localStorage:', localStorage.getItem('access_token'));  // Verifica que el token se guardó
        this.router.navigate(['/']);  // Redirige a la página de inicio u otra página
      } else {
        console.error('No se recibió token de acceso');
        this.loginError = "No se recibió token de acceso.";
      }
    }, (error) => {
      console.error('Error en el login:', error);
      this.failedAttempts++;
      localStorage.setItem('failedAttempts', this.failedAttempts.toString());
      if (this.failedAttempts >= 3) {
        this.isLocked = true;
        this.lockUntil = Date.now() + this.lockDuration * 1000;
        localStorage.setItem('lockUntil', this.lockUntil.toString());
        this.lockTimeLeft = this.lockDuration;
        this.startLockTimer();
        this.loginError = "Demasiados intentos fallidos. Bloqueado por 2 minutos.";
      } else {
        this.loginError = `Credenciales incorrectas. Intento ${this.failedAttempts}/3.`;
      }
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      this.loginError = "Credenciales incorrectas";
    });
    this.authService.login(this.Username?.value, this.Password?.value).subscribe((loginResponse: any) => {
       localStorage.setItem("user", this.Username?.value);
        location.replace('/');
     }, (error) => {
      localStorage.removeItem("user");
      this.loginError = "Credenciales incorrectas";
  });
  }

  private startLockTimer() {
    this.lockInterval = setInterval(() => {
      this.lockTimeLeft--;
      if (this.lockTimeLeft <= 0) {
        this.clearLockState();
      }
    }, 1000);
  }

  private clearLockState() {
    this.isLocked = false;
    this.failedAttempts = 0;
    this.lockTimeLeft = 0;
    localStorage.removeItem('failedAttempts');
    localStorage.removeItem('lockUntil');
    clearInterval(this.lockInterval);
  }


}
