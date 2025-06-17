import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ICarrito } from '../../../models/carrito.interface';
import { CuponAplicado } from '../../dashboard/cupones/cupon-aplicado';  // Importa la interfaz

@Component({
  selector: 'app-minicart',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './minicart.component.html',
  styleUrl: './minicart.component.css'
})
export class MinicartComponent implements OnInit {
  isCartOpen: boolean = false;  // Indica si el carrito está abierto o cerrado
  productosCarrito: ICarrito[] = [];
  cuponAplicado: CuponAplicado | null = null;  // Cambia la definición de cuponAplicado
  cupones: CuponAplicado[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.productosCarrito.subscribe(productosCarrito => {
      this.productosCarrito = productosCarrito;
    });

    // this.cartService.cuponAplicado$.subscribe(cupon => {
    //   this.cuponAplicado = cupon;
    // });
    this.cupones = this.cartService.getCuponesAplicados();
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  removeFromCart(productoCarritoId: number) {
    this.cartService.quitarProducto(productoCarritoId);
  }

  // calculateTotal() {
  //   let total = this.productosCarrito.reduce((sum, item) => sum + item.producto.precio, 0);

  //   if (this.cuponAplicado) {
  //     const cupon = this.cuponAplicado;
  //     if (cupon.tipo_descuento === 'PORCENTAJE') {
  //       total = total - (total * (cupon.valor_descuento / 100));
  //     } else if (cupon.tipo_descuento === 'MONTO') {
  //       total = total - cupon.valor_descuento;
  //     }

  //     // No permitir totales negativos
  //     if (total < 0) total = 0;
  //   }

  //   return total.toFixed(2);
  // }
  calculateTotal() {
    let total = this.productosCarrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0); 
  
    const cupones = this.cartService.getCuponesAplicados();
  
    for (const cupon of cupones) {
      if (cupon.tipo_descuento === 'PORCENTAJE') {
        total -= total * (cupon.valor_descuento / 100);
      } else if (cupon.tipo_descuento === 'MONTO') {
        total -= cupon.valor_descuento;
      }
    }
  
    if (total < 0) total = 0;
  
    return total.toFixed(2);
  }
  

  viewCart() {
    // Lógica para ver el carrito
  }

  agregarItem(carrito: ICarrito) {
     this.cartService.agregarProducto(carrito.producto).subscribe(
           (response) => {
             this.cartService.actualizarCarrito();
           },
           (error) => {
             console.error('Error al agregar producto al carrito:', error);
           }
         );
  }

  quitarItem(carrito: ICarrito) {
    this.cartService.quitarItemProducto(carrito.producto).subscribe(
           (response) => {
             this.cartService.actualizarCarrito();
           },
           (error) => {
             console.error('Error al quitar producto al carrito:', error);
           }
         );
  }

  checkout() {
    // Cerrar el slide del carrito
    this.toggleCart();
  }
}
