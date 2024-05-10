import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
      dni: ["",Validators.required, Validators.pattern("^[0-9]*$")],
      username: ["",[Validators.required,Validators.minLength(5), Validators.maxLength(20) ]],
      email: ["",[Validators.required, Validators.email]],
      password:["",[Validators.required,Validators.minLength(6)]],
      confirm_password: ["", Validators.required],

  });
  }

  onEnviar(event:Event)
  {
    console.log(this.form.value)


    event.preventDefault;
    if(this.form.valid){
      alert("Enviar al servidor...");
    }
    else
    {
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