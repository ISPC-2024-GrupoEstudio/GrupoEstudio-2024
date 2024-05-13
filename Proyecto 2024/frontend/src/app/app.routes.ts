import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { LoginComponent } from './pages/auth/login/login.component';

import { Component } from '@angular/core';
import { ProductosComponent } from './pages/productos/productos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { Compra01Component } from './pages/dashboard/compra01/compra01.component';
import { Compra02Component } from './pages/dashboard/compra02/compra02.component';
import { Compra03Component } from './pages/dashboard/compra03/compra03.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "registro", component:RegistroComponent},
    {path:"galeria", component:ProductosComponent},
    {path: "login", component: LoginComponent},
    {path: "dashboard", component:DashboardComponent},
    {path: "contacto", component: ContactoComponent},
    {path: "compra01", component: Compra01Component},
    {path: "compra02", component: Compra02Component},
    {path: "compra03", component: Compra03Component}
];
