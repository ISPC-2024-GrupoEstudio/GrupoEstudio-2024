import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-historial-compras',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './historial-compras.component.html',
  styleUrl: './historial-compras.component.css'
})
export class HistorialComprasComponent {
  showSections: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica si la URL actual es '/dashboard/detalles-compra' o '/dashboard/historial-compras'
        this.showSections = !['/dashboard/historial-compras/detalle-compra'].includes(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {}
  
}
