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
    this.cartService.productosCarrito.subscribe(productosCarrito => {
      this.productosCarrito = productosCarrito;
    });
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  removeFromCart(productoCarritoId:number) {
    this.cartService.quitarProducto(productoCarritoId);
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
    // Cerrar el slide del carrito
    this.toggleCart();
  }
}