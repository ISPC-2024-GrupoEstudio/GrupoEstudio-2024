import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CuponService } from '../../../services/cupon.service'

@Component({
  selector: 'app-cupones',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.css'],
  providers: [CuponService]
})
export class CuponesComponent implements OnInit {
  cuponesDisponibles: any[] = [];
  cuponesGuardados: any[] = [];

  constructor(private cuponService: CuponService) {}

  ngOnInit(): void {
    this.obtenerCuponesDisponibles();
    // Podrías llamar también a los guardados si querés mostrarlos en otro lado
    // this.actualizarCuponesGuardados();
  }

  obtenerCuponesDisponibles(): void {
    this.cuponService.obtenerCuponesDisponibles().subscribe({
      next: (data) => {
        this.cuponesDisponibles = data || [];
      },
      error: (err) => {
        console.error(err);
        this.cuponesDisponibles = [];
      }
    });
  }

  actualizarCuponesGuardados(): void {
    this.cuponService.obtenerMisCupones().subscribe({
      next: (cupones) => {
        this.cuponesGuardados = cupones;
        console.log("Cupones guardados:", cupones);
      },
      error: (err) => {
        console.error("Error al obtener cupones guardados:", err);
      }
    });
  }

  alertaCupon(cupon: any): void {
    const id = cupon?.id || cupon?.cupon?.id;
    if (!id) {
      console.error("ID del cupón no encontrado");
      return;
    }

    this.cuponService.guardarCuponSeleccionado({ id }).subscribe({
      next: (response) => {
        console.log("Respuesta al guardar cupón:", response);
        this.actualizarCuponesGuardados();
      },
      error: (error) => {
        console.error("Error al guardar cupón:", error);
        this.actualizarCuponesGuardados();
      }
    });
  }
}
