import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { IProducto } from '../../models/producto.interface';
import { ICategoriaProducto } from '../../models/categoria.interface';
import CategoriaService from '../../services/categoria.service';

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

  constructor( private productoService:ProductoService, private categoriaService:CategoriaService) {}

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

}
