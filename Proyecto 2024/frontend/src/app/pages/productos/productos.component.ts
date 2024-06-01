import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { IProducto } from '../../models/producto.interface';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  providers: [ProductoService],
})
export class ProductosComponent implements OnInit{

  productos: IProducto[] = [];

  constructor( private productoService:ProductoService) {

  }
  ngOnInit(): void {
    this.productoService.getProducts().subscribe((data)=> {
      this.productos = data;
    })
  }

}
