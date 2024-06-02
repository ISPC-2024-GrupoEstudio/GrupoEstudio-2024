import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import {  NgFor } from '@angular/common';
import { PedidosService } from '../../../services/pedidos.service'
import { IPedido } from '../../../models/pedido.interface';
import { IProductoXPedido } from '../../../models/productosXPedido.interface';
import { ProductoXPedidoService } from '../../../services/productoXPedido.service';

@Component({
  selector: 'app-historial-compras',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor],
  templateUrl: './historial-compras.component.html',
  styleUrl: './historial-compras.component.css',
  providers: [
    PedidosService, ProductoXPedidoService
  ]
})
export class HistorialComprasComponent {
  showSections: boolean = true;
  historialPedidos: IPedido[] = [];
  productoXPedido: IProductoXPedido[] = [];

  constructor(private router: Router, private pedidoService: PedidosService, private productoXPedidoService:ProductoXPedidoService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSections = !['/dashboard/historial-compras/detalle-compra'].includes(event.urlAfterRedirects);
      }
    })
  }

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe((data) => {
      this.historialPedidos = data;
    })
    this.productoXPedidoService.getProductoXPedido().subscribe((data) => {
      this.productoXPedido = data;
    })
  }
  
}
