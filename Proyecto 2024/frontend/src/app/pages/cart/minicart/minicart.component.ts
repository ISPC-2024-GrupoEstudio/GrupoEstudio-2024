import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-minicart',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './minicart.component.html',
  styleUrl: './minicart.component.css'
})
export class MinicartComponent {
  isCartOpen: boolean = false; // Indica si el carrito está abierto o cerrado
  products: any[] = [
    { 
      name: 'Product 1', 
      price: 10, 
      image: "../../../assets/imagenes/Accesorios/Transportador.png"
    },
    { 
      name: 'Product 2', 
      price: 15, 
      image: 'assets/product2.jpg'
    },
  ]

  constructor() {
    // Puedes inicializar aquí los productos del carrito si lo necesitas
    // this.products = [{ name: 'Product 1', price: 10, image: 'path_to_image' }, { name: 'Product 2', price: 20, image: 'path_to_image' }];
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  removeFromCart(product: any) {
    // Lógica para eliminar el producto del carrito
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  calculateTotal() {
    // Lógica para calcular el total de la compra
    let total = 0;
    this.products.forEach(product => {
      total += product.price;
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
     // Cerrar el slide del carrito
     this.toggleCart();

  }
}
