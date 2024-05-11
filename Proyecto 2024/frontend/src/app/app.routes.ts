import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { Component } from '@angular/core';
import { ProductosComponent } from './pages/productos/productos.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "registro", component:RegistroComponent},
    {path:"galeria", component:ProductosComponent},
];
