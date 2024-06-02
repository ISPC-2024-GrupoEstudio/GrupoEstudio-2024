import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form:FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder
  ){
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    })
  }

  get Password() {
    return this.form.get("password");
  }

  get Email() {
    return this.form.get("email");
  }

  public onFormSubmit(event:Event) {
    event.preventDefault();
    if (this.form.valid) {
      alert("Enviando al servidor...");
    } else {
      this.form.markAllAsTouched();
    }
  }
}
