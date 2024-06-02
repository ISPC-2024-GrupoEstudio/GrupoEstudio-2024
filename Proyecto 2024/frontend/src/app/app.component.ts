import { Component } from '@angular/core';
import { RouterModule ,RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent} from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './pages/productos/productos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { MinicartComponent } from './pages/cart/minicart/minicart.component';
import { CheckoutComponent } from './pages/cart/checkout/checkout.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, DashboardComponent, RegistroComponent, CommonModule,HomeComponent,RouterModule, ProductosComponent, ContactoComponent, MinicartComponent, CheckoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
