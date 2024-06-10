import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ICarrito } from '../../../models/carrito.interface';

@Component({
  selector: 'app-minicart',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet,],
  templateUrl: './minicart.component.html',
  styleUrl: './minicart.component.css'
})
export class MinicartComponent implements OnInit {
  isCartOpen: boolean = false; // Indica si el carrito está abierto o cerrado
  productosCarrito: ICarrito[] = [];


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(productosCarrito => {
      this.productosCarrito = productosCarrito;
    });
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  //revisar de acá para abajo
  removeFromCart(product: any) {
    // Lógica para eliminar el producto del carrito
    const index = this.productosCarrito.indexOf(product);
    if (index !== -1) {
      this.productosCarrito.splice(index, 1);
    }
  }

  calculateTotal() {
    // Lógica para calcular el total de la compra
    let total = 0;
    this.productosCarrito.forEach(productosCarrito => {
      total += productosCarrito.producto.precio;
    });
    return total;
  }
  viewCart() {
    // Lógica para ver el carrito
    // Puedes navegar a una ruta específica o abrir un modal, dependiendo de tus necesidades
  }

  checkout() {
    // Lógica para proceder al proceso de pago
    // Puedes navegar a la página de pago o ejecutar otras acciones necesarias
  
    this.cartService.checkout().subscribe(
      response => {
        console.log('Compra finalizada:', response);
        // Lógica adicional después de finalizar la compra
      },
      error => {
        console.error('Error al finalizar la compra:', error);
        // Lógica para manejar el error
      }
    );
  
    // Cerrar el slide del carrito
    this.toggleCart();
  }
}