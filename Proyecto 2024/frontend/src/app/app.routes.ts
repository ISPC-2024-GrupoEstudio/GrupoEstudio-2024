import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { LoginComponent } from './pages/auth/login/login.component';

import { Component } from '@angular/core';
import { ProductosComponent } from './pages/productos/productos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { HistorialComprasComponent } from './pages/dashboard/historial-compras/historial-compras.component';
import { DetalleComprasComponent } from './pages/dashboard/detalle-compras/detalle-compras.component';
import { CuponesComponent } from './pages/dashboard/cupones/cupones.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CheckoutComponent } from './pages/cart/checkout/checkout.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "registro", component:RegistroComponent},
    {path:"galeria", component:ProductosComponent},
    {path: "login", component: LoginComponent},
    {path: "checkout", component: CheckoutComponent},
    {path: "dashboard", component:DashboardComponent, children: [
        {path:"historial-compras", component: HistorialComprasComponent, children: [
            {path: "detalle-compra", component: DetalleComprasComponent},

        ]},

    ]},
    {path:"cupones", component: CuponesComponent},
    {path: "contacto", component: ContactoComponent},

    {path: "**", component: NotFoundComponent}
   
];
