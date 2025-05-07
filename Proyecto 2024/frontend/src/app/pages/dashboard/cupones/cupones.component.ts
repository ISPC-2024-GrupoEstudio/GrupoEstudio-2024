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

  constructor(private cuponService: CuponService, private cartService: CartService) {}

  ngOnInit(): void {
    this.cargarCupones();
  }

  cargarCupones(): void {
    this.cuponService.getCupones().subscribe(cupones => {
      this.cuponesDisponibles = cupones;
    });

    this.cuponService.getMisCupones().subscribe(cuponIds => {
      this.misCupones = this.cuponesDisponibles.filter(cupon => cuponIds.includes(cupon.id));
    });
  }

  isCuponVencido(cupon: Cupon): boolean {
    const fechaVencimiento = new Date(cupon.fecha_vencimiento);
    const fechaActual = new Date();
    return fechaVencimiento < fechaActual;
  }

  seleccionarCupon(cupon: Cupon): void {
    const username = localStorage.getItem('user');
  
    if (!username) {
      console.error('Usuario no autenticado');
      return;
    }
  
    this.cuponService.agregarCupon(username, cupon.id).subscribe({
      next: (res) => {
        console.log('Cupón aplicado:', res);
        this.cargarCupones();
      },
      error: (err) => console.error('Error al aplicar cupón:', err)
    });  
    
  }

  usarCupon(cupon: Cupon): void {
    const cuponAplicado: CuponAplicado = {
      id: cupon.id,
      nombre: cupon.nombre,
      tipo_descuento: cupon.tipo_descuento as 'PORCENTAJE' | 'MONTO',
      valor_descuento: cupon.valor_descuento
    };
  
    this.cartService.aplicarCupon(cuponAplicado);
  }
  
}
