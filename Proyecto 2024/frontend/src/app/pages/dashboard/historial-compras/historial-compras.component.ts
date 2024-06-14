import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import {  NgFor, NgIf } from '@angular/common';
import { PedidosService } from '../../../services/pedidos.service'
import { IPedido } from '../../../models/pedido.interface';
import { IProductoXPedido } from '../../../models/productosXPedido.interface';
import { ProductoXPedidoService } from '../../../services/productoXPedido.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-historial-compras',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor, NgIf],
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
  nombreUsuarioLogin = ""
  nombreUsuarioPedido= ""

  constructor(private router: Router, private pedidoService: PedidosService, private productoXPedidoService:ProductoXPedidoService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSections = !['/dashboard/historial-compras/detalle-compra'].includes(event.urlAfterRedirects);
      }
    })
  }

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe((data) => {
      this.historialPedidos = data.filter(pedido => pedido.nombre_usuario === this.nombreUsuarioLogin);
      console.log(this.historialPedidos);
    });
    this.productoXPedidoService.getProductoXPedido().subscribe((data) => {
      this.productoXPedido = data;
    })
    this.pedidoService.getUsuario().subscribe(username => {
      this.nombreUsuarioLogin = username;  // Asigna el valor al componente
      console.log("Nombre de usuario:", this.nombreUsuarioLogin);  // Muestra en la consola (opcional)
    });
  }

  verDetalleCompra(idPedido: number): void {
    this.router.navigate(['/dashboard/historial-compras/detalle-compra', idPedido]);
    console.log("ID PEDIDO EN HISTORIAL" + idPedido)
  }
  
}
