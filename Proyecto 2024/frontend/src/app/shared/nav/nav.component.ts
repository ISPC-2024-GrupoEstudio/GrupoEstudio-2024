import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { MinicartComponent } from '../../pages/cart/minicart/minicart.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule,RouterOutlet, MinicartComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {


}
