import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { IProducto } from '../../models/producto.interface';
import { ICategoriaProducto } from '../../models/categoria.interface';
import CategoriaService from '../../services/categoria.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FiltroProductosComponent } from '../../components/filtro-productos/filtro-productos.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FiltroProductosComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  providers: [ProductoService, CategoriaService],
})
export class ProductosComponent implements OnInit {
  categorias: ICategoriaProducto[] = [];
  categoriasVisibles: ICategoriaProducto[] = [];
  productos: IProducto[] = [];
  selectedProducto: IProducto | null = null;
  selectedCategoriaId: number | null = null;
  searchText: string = '';

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
      this.categoriasVisibles = data;
    });

    this.productoService.getProducts().subscribe((data) => {
      this.productos = data;
    });
  }

  getProductosPorCategoria(categoriaId: number) {
    return this.productos
      .filter((p) => p.id_categoria_producto === categoriaId )
      .filter((p) => p.nombre.toLowerCase().includes(this.searchText.toLowerCase()) || p.descripcion.toLowerCase().includes(this.searchText.toLowerCase()));
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
        //alert('Producto agregado al carrito con éxito !'+JSON.stringify(response));
        this.cartService.actualizarCarrito();
        Swal.fire({
          title: 'Producto agregado al carrito con éxito !',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        })
      },
      (error) => {
        console.error('Error al agregar producto al carrito:', error);
      }
    );
  }

  //Funciones para el filtro

  getProductosFiltrados(): IProducto[] {
    return this.productos.filter((p) => {
      const coincideCategoria =
        this.selectedCategoriaId === null || p.id_categoria_producto === this.selectedCategoriaId;
  
      const coincideBusqueda =
        p.nombre.toLowerCase().includes(this.searchText) ||
        p.descripcion.toLowerCase().includes(this.searchText);
  
      return coincideCategoria && coincideBusqueda;
    });
  }
  
  onCategoriaSeleccionada(categoriaId: number | null) {
    if (categoriaId === null) {
      this.categoriasVisibles = this.categorias;
    } else {
      this.categoriasVisibles = this.categorias.filter((c) => c.id_categoria_producto === categoriaId);
    }
  }
  
  onTextoBusqueda(texto: string) {
    this.searchText = texto;
  }
  

  // Funciones para manejar el detalle del producto
  verDetalle(producto: IProducto) {
    this.selectedProducto = producto;
  }

  cerrarDetalle() {
    this.selectedProducto = null;
  }
}
