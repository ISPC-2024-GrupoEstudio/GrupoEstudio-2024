import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  form!: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      names: ["", Validators.required],
      lastName: ["", Validators.required],
      tipodni: ["", Validators.required],
      dni: ["",Validators.required],
      username: ["",[Validators.required,Validators.minLength(4), Validators.maxLength(20) ]],
      email: ["",[Validators.required, Validators.email]],
      password:["",[Validators.required]],
      confirm_password: ["", Validators.required],

  });
  }
  onEnviar(event:Event)
  {
    console.log(this.form.value)
  }
}
