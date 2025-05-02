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

  // cuponesLista: {url: string,name:string, descripcion:string, fechaVencimiento: Date}[] = [
  //   {url: "./../../../../assets/imagenes/Dashboard/cupon-de-descuento.png", name:"Invierno 50% Off", descripcion:"Aprovecha estos descuentos para abrigar a tus mascotas", fechaVencimiento: new Date(2024,6,31)},
  //   {url: "./../../../../assets/imagenes/Dashboard/cucha.png", name:"Cuchas 15% Off", descripcion:"Solo por el mes de Junio,en la seccion de cuchas", fechaVencimiento: new Date(2024,5,30)},
  //   {url: "./../../../../assets/imagenes/Dashboard/gato.png", name:"Cats Day 20% Off", descripcion:"Febrero es el mes de tu gato, aprovecha y mimalo", fechaVencimiento: new Date(2024,1,28)},
  //   {url: "./../../../../assets/imagenes/Dashboard/percha.png", name:"Ropita Sale 30% Off", descripcion:"En toda la seccion de Ropa, solo por el mes de Mayo", fechaVencimiento: new Date(2024,7,1)},

  // ]
  
  cuponesDisponibles: Cupon[] = [];
  misCupones: Cupon[] = [];

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
    const username = localStorage.getItem('user'); // Asegúrate de que esté guardado tras login
  
    if (!username) {
      console.error('Usuario no autenticado');
      return;
    }
  
    this.cuponService.agregarCupon(username, cupon.id).subscribe({
      next: (res) => {
        console.log('Cupón aplicado:', res);
        this.cargarCupones(); // Refrescar cupones para que se actualicen en pantalla
      },
      error: (err) => console.error('Error al aplicar cupón:', err)
    });
  
    
  }
}
