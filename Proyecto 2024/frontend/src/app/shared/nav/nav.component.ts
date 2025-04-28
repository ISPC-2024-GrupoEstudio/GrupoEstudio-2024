import { Component } from '@angular/core';
import { RouterOutlet,RouterModule, Router } from '@angular/router';
import { MinicartComponent } from '../../pages/cart/minicart/minicart.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule,RouterOutlet, MinicartComponent],
  providers: [AuthService],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  public nombreUsuario = "";
  public fotoPerfil = "";
  constructor(private readonly authService:AuthService, private readonly router:Router){}

  ngOnInit(): void {
    // Solo obtener el nombre de usuario desde localStorage
    const username = localStorage.getItem('user');
    if (username) {
      this.nombreUsuario = username;
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get isAuthenticated(){
    return this.authService.isAuthenticated();
  }
  
}
