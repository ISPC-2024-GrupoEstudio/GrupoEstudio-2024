import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CuponService, Cupon } from '../../../services/cupon.service';
import { CartService } from '../../../services/cart.service';
import { CuponAplicado } from './cupon-aplicado';

@Component({
  selector: 'app-cupones',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './cupones.component.html',
  styleUrl: './cupones.component.css'
})
export class CuponesComponent implements OnInit {

  cuponesDisponibles: Cupon[] = [];
  misCupones: Cupon[] = [];
  mostrarModal: boolean = false;

  constructor(private cuponService: CuponService, private cartService: CartService) {}

  ngOnInit(): void {
    this.cargarCupones();
  }

  cargarCupones(): void {
    // Obtén el nombre de usuario del localStorage
    const username = localStorage.getItem('user');

    if (username) {
      // Obtiene los cupones disponibles
      this.cuponService.getCupones().subscribe(cupones => {
        this.cuponesDisponibles = cupones;
      });

      // Obtiene los cupones del usuario
      this.cuponService.getMisCupones(username).subscribe(cupones => {
        this.misCupones = cupones;
      });
    } else {
      console.error('Usuario no autenticado');
    }
  }

  // seleccionarCupon(cupon: Cupon): void {
  //   this.cartService.aplicarCupon(cupon);
  //   const username = localStorage.getItem('user'); 
  //   if (!username) {
  //     console.error('Usuario no autenticado');
  //     return;
  //   }
  
  //   this.cuponService.agregarCupon(username, cupon.id).subscribe({
  //     next: (res) => {
  //       console.log('Cupón aplicado:', res);
  //       this.cargarCupones();
  //       this.mostrarModal = true; // Mostrar modal
  //     },
  //     error: (err) => console.error('Error al aplicar cupón:', err)
  //   });
    
  // }
  seleccionarCupon(cupon: Cupon): void {
    const cuponAplicado: CuponAplicado = {
      ...cupon,
      tipo_descuento: cupon.tipo_descuento as 'PORCENTAJE' | 'MONTO'
    };
  
    this.cartService.aplicarCupon(cuponAplicado);
  
    const username = localStorage.getItem('user'); 
    if (!username) {
      console.error('Usuario no autenticado');
      return;
    }
  
    this.cuponService.agregarCupon(username, cupon.id).subscribe({
      next: (res) => {
        console.log('Cupón aplicado:', res);
        this.cargarCupones();
        this.mostrarModal = true;
      },
      error: (err) => console.error('Error al aplicar cupón:', err)
    });
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
