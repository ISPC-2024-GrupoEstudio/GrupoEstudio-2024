import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet} from '@angular/router';
import { PedidosService } from '../../../services/pedidos.service';
import { IPedido } from '../../../models/pedido.interface';
import { NgFor, NgIf, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ProductoXPedidoService } from '../../../services/productoXPedido.service';
import { IProductoXPedido } from '../../../models/productosXPedido.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';


@Component({
  selector: 'app-detalle-compras',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor, NgIf, CurrencyPipe, TitleCasePipe],
  templateUrl: './detalle-compras.component.html',
  styleUrl: './detalle-compras.component.css',
  providers: [PedidosService, ProductoXPedidoService, ProductoService]
})

export class DetalleComprasComponent implements OnInit{
  historialPedidos: IPedido[] = [];
  productoXpedido: IProductoXPedido [] =[]
  productosConNombres: { producto: IProductoXPedido, nombre: string }[] = [];
  idPedido: number = 0;
  costoEnvio: number = 0;
  totalFinalPedido: number = 0;
  codigoPostal: string = '';
  ciudadEnvio: string = '';
  tipoEnvioTexto: string = '';
  direccionEntrega: string = '';
  descuento: number = 0;
  localidad: string = '';

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

      this.pedidoService.getPedidos().subscribe((pedidos: IPedido[]) => {
        const pedidoEncontrado = pedidos.find(p => p.id_pedido === this.idPedido);
        if (pedidoEncontrado) {
          this.costoEnvio = pedidoEncontrado.costo_envio || 0; // en caso de que sea null o undefined
          this.totalFinalPedido = pedidoEncontrado.total || 0;
          this.codigoPostal = pedidoEncontrado.codigo_postal || '';
          this.ciudadEnvio = pedidoEncontrado.ciudad_envio || '';
          this.direccionEntrega = pedidoEncontrado.domicilio_envio || '';
          this.descuento = pedidoEncontrado.descuento || 0;
          this.localidad = pedidoEncontrado.localidad || '';
          this.tipoEnvioTexto = pedidoEncontrado.id_tipo_de_envio === 1 ? 'A domicilio' :
                          pedidoEncontrado.id_tipo_de_envio === 2 ? 'A sucursal' : 'Desconocido';
          console.log("Costo de envío:", this.costoEnvio);
        } else {
          console.warn('No se encontró el pedido con ese ID');
        }
      });

      
      console.log("ID EN DETALLESS " + this.idPedido);

      this.productoXPedidoService.getProductoXPedido(this.idPedido).subscribe((data) => {
        this.productoXpedido = data;
        console.log("producto x pedido en detalle compra:");

        this.productosConNombres = [];

        data.forEach(producto => {
          if (producto.id_pedido === this.idPedido) {
            this.productoService.getProductoById(producto.id_producto).subscribe((productoCompleto) => {
              this.productosConNombres.push({ producto, nombre: productoCompleto.nombre});
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


