import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CuponService, Cupon } from '../../../services/cupon.service';

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

  constructor(private cuponService: CuponService) {}

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
        this.mostrarModal = true; // Mostrar modal
      },
      error: (err) => console.error('Error al aplicar cupón:', err)
    });
    
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
