import {RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';



export const routes: Routes = [
{path:'',redirectTo:'/inicio', pathMatch:'full'},
{path:'login',component: LoginComponent},
{path:'contacto', component: ContactoComponent},
{path:'productos', component: ProductosComponent},
{path:'inicio', component:DashboardComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
