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
  providers: [
    AuthService
  ]
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
    this.authService.login(this.Username?.value, this.Password?.value).subscribe((data:any) => {
      localStorage.setItem("user",this.Username?.value)
      this.router.navigate(["/"]);
    }, (error) => {
      localStorage.removeItem("user");
      this.loginError = "Credenciales incorrectas"
    })
  }
}
