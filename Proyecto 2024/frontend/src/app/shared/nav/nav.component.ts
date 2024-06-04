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
  constructor(private readonly authService:AuthService, private readonly router:Router){}

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get isAuthenticated(){
    return this.authService.isAuthenticated();
  }

}
