import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ArrepentimientoComponent } from './pages/arrepentimiento/arrepentimiento.component';
import { Component } from '@angular/core';
import { ProductosComponent } from './pages/productos/productos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { HistorialComprasComponent } from './pages/dashboard/historial-compras/historial-compras.component';
import { DetalleComprasComponent } from './pages/dashboard/detalle-compras/detalle-compras.component';
import { CuponesComponent } from './pages/dashboard/cupones/cupones.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CheckoutComponent } from './pages/cart/checkout/checkout.component';
import { permisosGuard } from './pages/guards/permisos.guard';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EditarPerfilComponent } from './pages/perfil/editar-perfil/editar-perfil.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "registro", component:RegistroComponent},
    {path:"galeria", component:ProductosComponent},
    {path: "login", component: LoginComponent},
    {path: "checkout", component: CheckoutComponent, canActivate :[permisosGuard] },
    {path: "dashboard", component:DashboardComponent,  canActivate:[permisosGuard], children: [
        {path:"historial-compras", component: HistorialComprasComponent, canActivate:[permisosGuard], children: [
            {path: "detalle-compra/:id", component: DetalleComprasComponent},
        ]},
    ]},
    {path:"cupones", component: CuponesComponent},
    {path: "contacto", component: ContactoComponent},
    {path: "perfil", component: PerfilComponent, children: [
        {path: "editar-perfil", component: EditarPerfilComponent}
    ]},

    { path: 'arrepentimiento', component: ArrepentimientoComponent },
    { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
    { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
    {path: "**", component: NotFoundComponent}
];
  