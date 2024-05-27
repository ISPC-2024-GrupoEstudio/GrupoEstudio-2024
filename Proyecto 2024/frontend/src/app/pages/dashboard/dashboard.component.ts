import { Component, Input } from '@angular/core';
import { NavigationEnd, RouterLink, RouterOutlet, Router } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showSections: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSections = event.urlAfterRedirects !== '/dashboard/historial-compras';
      }
    });
  }

  ngOnInit(): void {}

  hideSections(): void {
    this.showSections = false;
  }
  
}
