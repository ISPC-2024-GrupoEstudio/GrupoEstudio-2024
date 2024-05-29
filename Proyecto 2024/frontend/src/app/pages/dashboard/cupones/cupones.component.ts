import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cupones',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './cupones.component.html',
  styleUrl: './cupones.component.css'
})
export class CuponesComponent {

  cuponesLista: {url: string,name:string, descripcion:string, fechaVencimiento: Date}[] = [
    {url: "./../../../../assets/imagenes/Dashboard/cupon-de-descuento.png", name:"Invierno 50% Off", descripcion:"Aprovecha estos descuentos para abrigar a tus mascotas", fechaVencimiento: new Date(2024,6,31)},
    {url: "./../../../../assets/imagenes/Dashboard/cucha.png", name:"Cuchas 15% Off", descripcion:"Solo por el mes de Junio,en la seccion de cuchas", fechaVencimiento: new Date(2024,5,30)},
    {url: "./../../../../assets/imagenes/Dashboard/gato.png", name:"Cats Day 20% Off", descripcion:"Febrero es el mes de tu gato, aprovecha y mimalo", fechaVencimiento: new Date(2024,1,28)},
    {url: "./../../../../assets/imagenes/Dashboard/percha.png", name:"Ropita Sale 30% Off", descripcion:"En toda la seccion de Ropa, solo por el mes de Mayo", fechaVencimiento: new Date(2024,7,1)},

  ]
  
  alertaCupon(): void {
    alert('Cupón seleccionado con éxito !');
  }
}
