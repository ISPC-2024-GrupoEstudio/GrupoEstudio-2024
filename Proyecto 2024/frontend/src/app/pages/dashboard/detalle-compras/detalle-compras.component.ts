import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet} from '@angular/router';
import { PedidosService } from '../../../services/pedidos.service';
import { IPedido } from '../../../models/pedido.interface';
import { NgFor } from '@angular/common';
import { ProductoXPedidoService } from '../../../services/productoXPedido.service';
import { IProductoXPedido } from '../../../models/productosXPedido.interface';


@Component({
  selector: 'app-detalle-compras',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor],
  templateUrl: './detalle-compras.component.html',
  styleUrl: './detalle-compras.component.css',
  providers: [PedidosService, ProductoXPedidoService]
})

export class DetalleComprasComponent implements OnInit{
  historialPedidos: IPedido[] = [];
  productoXpedido: IProductoXPedido [] =[]

  constructor(
    private router: Router, 
    private pedidoService: PedidosService,
    private productoXPedidoService: ProductoXPedidoService
  ) {}

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe((data) => {
      this.historialPedidos = data;

    });
  }

  volverAComprar(idPedido: number): void {
    // Lógica para volver a comprar
    console.log(`Volver a comprar el pedido con id: ${idPedido}`);
  }
}


