import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent} from './pages/dashboard/dashboard.component';
import { ProductosComponent } from "./pages/productos/productos.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavComponent, FooterComponent, DashboardComponent, ProductosComponent]
})
export class AppComponent {
  title = 'frontend';
}
