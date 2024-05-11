import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "registro", component:RegistroComponent},
];
