import { Component, ViewChild, ViewContainerRef, ComponentRef, Injector } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { PedidosService } from '../../../services/pedidos.service'
import { IPedido } from '../../../models/pedido.interface';
import { IProductoXPedido } from '../../../models/productosXPedido.interface';
import { ProductoXPedidoService } from '../../../services/productoXPedido.service';
import { filter } from 'rxjs';
import { DetalleComprasComponent } from '../detalle-compras/detalle-compras.component'; // Corregido el nombre del componente

// Importación para Bootstrap Modal
declare var bootstrap: any;

@Component({
  selector: 'app-historial-compras',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor, NgIf, DatePipe, DetalleComprasComponent],
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
  nombreUsuarioLogin = "";
  nombreUsuarioPedido = "";
  idPedidoSeleccionado: number = 0;
  detalleModal: any;

  @ViewChild('detalleCompraContainer', { read: ViewContainerRef }) detalleCompraContainer!: ViewContainerRef;
  detalleCompraRef: ComponentRef<DetalleComprasComponent> | null = null;

  constructor(
    private router: Router, 
    private pedidoService: PedidosService, 
    private productoXPedidoService: ProductoXPedidoService,
    private injector: Injector,
    private route: ActivatedRoute
  ) {
    // Ya no necesitamos este código porque no cambiamos de ruta
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.showSections = !['/dashboard/historial-compras/detalle-compra'].includes(event.urlAfterRedirects);
    //   }
    // })
  }

  ngOnInit(): void {
    this.pedidoService.getUsuario().subscribe(username => {
      this.nombreUsuarioLogin = username;
      console.log("Nombre de usuario:", this.nombreUsuarioLogin);
      
      // Movemos la carga de pedidos para que se ejecute después de obtener el nombre de usuario
      this.cargarPedidos();
    });
  }

  ngAfterViewInit(): void {
    // Inicializa el modal después de que la vista esté lista
    this.detalleModal = new bootstrap.Modal(document.getElementById('detalleCompraModal'));
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe((data) => {
      this.historialPedidos = data.filter(pedido => pedido.nombre_usuario === this.nombreUsuarioLogin);
      console.log(this.historialPedidos);
    });
  }

  abrirModalDetalle(idPedido: number): void {
    this.idPedidoSeleccionado = idPedido;
    console.log("Abriendo modal para el pedido ID:", idPedido);
    
    // Cargar dinámicamente el componente de detalle
    if (this.detalleCompraContainer) {
      this.detalleCompraContainer.clear();
      
      // Crear un ActivatedRoute personalizado para simular los parámetros de ruta
      const activatedRouteFactory = this.injector.get(ActivatedRoute);
      const mockActivatedRoute = {
        ...activatedRouteFactory,
        paramMap: {
          subscribe: (fn: any) => {
            fn({
              get: (param: string) => {
                if (param === 'id') return idPedido.toString();
                return null;
              }
            });
            return { unsubscribe: () => {} };
          }
        }
      };
      
      // Crear un injector personalizado con la ruta simulada
      const customInjector = Injector.create({
        providers: [
          { provide: ActivatedRoute, useValue: mockActivatedRoute }
        ],
        parent: this.injector
      });
      
      // Crear el componente con el injector personalizado
      this.detalleCompraRef = this.detalleCompraContainer.createComponent(
        DetalleComprasComponent,
        { injector: customInjector }
      );
      
      // Establecer manualmente el ID del pedido en el componente hijo
      if (this.detalleCompraRef.instance) {
        this.detalleCompraRef.instance.idPedido = idPedido;
        
        // Forzar la detección de cambios para que el componente se actualice
        this.detalleCompraRef.changeDetectorRef.detectChanges();
      }
    }
    
    // Mostrar el modal
    this.detalleModal.show();
  }
}