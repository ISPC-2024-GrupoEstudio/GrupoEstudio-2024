import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CuponService } from '../../../services/cupon.service'

@Component({
  selector: 'app-cupones',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './cupones.component.html',
  styleUrl: './cupones.component.css',
  providers: [CuponService]
})
export class CuponesComponent implements OnInit {

  cuponesLista: {url: string,name:string, descripcion:string, fechaVencimiento: Date}[] = [
    {url: "./../../../../assets/imagenes/Dashboard/cupon-de-descuento.png", name:"Invierno 50% Off", descripcion:"Aprovecha estos descuentos para abrigar a tus mascotas", fechaVencimiento: new Date(2025,6,31)},
    {url: "./../../../../assets/imagenes/Dashboard/cucha.png", name:"Cuchas 15% Off", descripcion:"Solo por el mes de Junio,en la seccion de cuchas", fechaVencimiento: new Date(2025,5,30)},
    {url: "./../../../../assets/imagenes/Dashboard/gato.png", name:"Cats Day 20% Off", descripcion:"Febrero es el mes de tu gato, aprovecha y mimalo", fechaVencimiento: new Date(2025,1,28)},
    {url: "./../../../../assets/imagenes/Dashboard/percha.png", name:"Ropita Sale 30% Off", descripcion:"En toda la seccion de Ropa, solo por el mes de Mayo", fechaVencimiento: new Date(2025,7,1)},

  ]
  misCupones: any[] = [];
  constructor(private cuponService: CuponService) {}
  ngOnInit(): void {
    this.obtenerMisCupones();
  }
  
  // alertaCupon(): void {
  //   alert('Cupón seleccionado con éxito !');
  // }

  alertaCupon(cupon: any) {
    const id = cupon?.id || cupon?.cupon?.id;
  
    if (!id) {
      console.error("ID del cupón no encontrado");
      return;
    }
  
    this.cuponService.guardarCuponSeleccionado({ id }).subscribe({
      next: (response) => {
        console.log("Cupón guardado:", response);
      },
      error: (error) => {
        console.error("Error al guardar cupón:", error);
      },
    });
  }
  
  

  // obtenerMisCupones(): void {
  //   this.cuponService.obtenerMisCupones().subscribe({
  //     next: (data) => {
  //       if (data.length === 0) {
  //         this.misCupones = this.cuponesLista.map(cupon => ({ cupon }));
  //       } else {
  //         this.misCupones = data;
  //       }
  //     },
  //     error: err => {
  //       console.error(err);        
  //       this.misCupones = this.cuponesLista.map(cupon => ({ cupon }));
  //     }
  //   });
  // }
  obtenerMisCupones(): void {
    this.cuponService.obtenerMisCupones().subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.misCupones = [];  // Si no hay cupones, la lista se vacía
        } else {
          this.misCupones = data;  // Si hay cupones, se asignan a misCupones
        }
      },
      error: (err) => {
        console.error(err);
        this.misCupones = [];  // En caso de error, no mostramos cupones
      }
    });
  }
  
}
