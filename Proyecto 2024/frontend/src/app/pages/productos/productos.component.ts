import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { IProducto } from '../../models/producto.interface';
import { ICategoriaProducto } from '../../models/categoria.interface';
import CategoriaService from '../../services/categoria.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  providers: [ProductoService, CategoriaService],
})
export class ProductosComponent implements OnInit {
  categorias: ICategoriaProducto[] = [];
  productos: IProducto[] = [];
  selectedProducto: IProducto | null = null;  // Solo una declaración de selectedProducto

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });

    this.productoService.getProducts().subscribe((data) => {
      this.productos = data;
    });
  }

  getProductosPorCategoria(categoriaId: number) {
    return this.productos.filter((p) => p.id_categoria_producto === categoriaId);
  }

  addToCart(producto: IProducto) {
    if (!this.authService.isAuthenticated()) {
      Swal.fire({
        title: '¡Debes estar logueado!',
        text: 'Inicia sesión para agregar productos al carrito.',
        icon: 'warning',
        confirmButtonText: 'Ir a login',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
      return;
    }

    this.cartService.agregarProducto(producto).subscribe(
      (response) => {
        this.cartService.actualizarCarrito();
      },
      (error) => {
        console.error('Error al agregar producto al carrito:', error);
      }
    );
  }

  // Funciones para manejar el detalle del producto
  verDetalle(producto: IProducto) {
    this.selectedProducto = producto;
  }

  cerrarDetalle() {
    this.selectedProducto = null;
  }
}
