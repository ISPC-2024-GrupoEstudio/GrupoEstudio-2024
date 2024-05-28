import { Component, Input } from '@angular/core';
import { NavigationEnd, RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf, NgFor, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showSections: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica si la URL actual es '/dashboard/detalles-compra' o '/dashboard/historial-compras'
        this.showSections = !['/dashboard/detalles-compra', '/dashboard/historial-compras'].includes(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {}
  
}
