import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet} from '@angular/router';
import { PedidosService } from '../../../services/pedidos.service';
import { IPedido } from '../../../models/pedido.interface';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { ProductoXPedidoService } from '../../../services/productoXPedido.service';
import { IProductoXPedido } from '../../../models/productosXPedido.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';


@Component({
  selector: 'app-detalle-compras',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor, NgIf, CurrencyPipe],
  templateUrl: './detalle-compras.component.html',
  styleUrl: './detalle-compras.component.css',
  providers: [PedidosService, ProductoXPedidoService, ProductoService]
})

export class DetalleComprasComponent implements OnInit{
  historialPedidos: IPedido[] = [];
  productoXpedido: IProductoXPedido [] =[]
  productosConNombres: { producto: IProductoXPedido, nombre: string }[] = [];
  idPedido: number = 0;
  totalCompra: number = 0;

  constructor(
    private router: Router, 
    private pedidoService: PedidosService,
    private productoXPedidoService: ProductoXPedidoService,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idPedido = parseInt(paramMap.get('id') || '0');
      console.log("ID EN DETALLESS " + this.idPedido);

      this.productoXPedidoService.getProductoXPedido(this.idPedido).subscribe((data) => {
        this.productoXpedido = data;
        console.log("producto x pedido en detalle compra:");

        this.totalCompra = 0; 
        this.productosConNombres = [];

        data.forEach(producto => {
          if (producto.id_pedido === this.idPedido) {
            this.productoService.getProductoById(producto.id_producto).subscribe((productoCompleto) => {
              this.productosConNombres.push({ producto, nombre: productoCompleto.nombre});
              this.totalCompra += producto.precio * producto.cantidad;
              console.log(`Producto nombre: ${productoCompleto.nombre} (ID: ${producto.id_producto}), Cantidad: ${producto.cantidad}, Precio: ${producto.precio}`);
            });
          }
        });
      });
    });
  }

  volverAComprar(idPedido: number): void {
    // Lógica para volver a comprar
    console.log(`Volver a comprar el pedido con id: ${idPedido}`);
  }
}


