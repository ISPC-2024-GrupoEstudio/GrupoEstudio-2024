import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { IProducto } from '../../models/producto.interface';
import { ICategoriaProducto } from '../../models/categoria.interface';
import CategoriaService from '../../services/categoria.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  providers: [ProductoService, CategoriaService],
})
export class ProductosComponent implements OnInit{
  categorias: ICategoriaProducto[] = [];
  productos: IProducto[] = [];

  constructor( private productoService:ProductoService, private categoriaService:CategoriaService, private cartService: CartService) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((data)=> {
      this.categorias = data;
    })
    this.productoService.getProducts().subscribe((data)=> {
      this.productos = data;
    })
  }

  getProductosPorCategoria(categoriaId:number) {
    return this.productos.filter((p) => p.id_categoria_producto === categoriaId);
  }

  addToCart(producto: IProducto) {
    this.cartService.addToCart(producto).subscribe(
      response => {
        console.log('Producto agregado al carrito:', response);
        // Aquí puedes realizar acciones adicionales después de agregar el producto al carrito, como mostrar un mensaje de éxito.
      },
      error => {
        console.error('Error al agregar producto al carrito:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario.
      }
    );
  }
}
