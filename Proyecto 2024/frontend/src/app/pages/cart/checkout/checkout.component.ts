import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    MercadoPago: any;
  }
}
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CartService} from '../../../services/cart.service';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ICarrito } from '../../../models/carrito.interface';
import { AuthService } from '../../../services/auth.service';
import { CuponAplicado } from '../../dashboard/cupones/cupon-aplicado';
import { CuponService } from '../../../services/cupon.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AfterViewInit } from '@angular/core';
import { CorreoArgentinoService } from '../../../services/correo-argentino.service';
import { UserService } from '../../../services/user.service';
import { DireccionService } from '../../../services/direccion.service';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule,NgFor, NgIf, FormsModule, TitleCasePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit, AfterViewInit{
  successMessage: string = ''; 
  errorMessage: string = ''; 

  productosCarrito: ICarrito[] = [];
  form!: FormGroup;
  descuento: number = 0; 
  tipoDescuento: 'porcentaje' | 'monto' = 'porcentaje'; 
  public mp: any; 
  envioCosto: number = 0;
  opcionesEnvio: any[] = [];
  direccionesGuardadas: any[] = [];
  
  // Nuevas propiedades para el flujo reformado
  tipoEnvioSeleccionado: string = '';
  sucursalesDisponibles: any[] = [];
  sucursalSeleccionada: any = null;
  sucursalSeleccionadaIndex: number | null = null;
  direccionEntrega: string = '';
  tipoEnvioId: number = 0; // 1 = domicilio, 2 = sucursal

  //Evitar bucle
  procesandoPago: boolean = false;
  mercadoPagoButtonRendered: boolean = false;
  esPagoPosible: boolean = false;
  ultimaPreferenciaGenerada: string = '';
  hashUltimoPedido: string = '';
  walletInstance: any;

  constructor(private _formBuilder: FormBuilder,
    private cartService: CartService,
    private authService : AuthService, 
    private cuponService : CuponService, 
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private direccionService: DireccionService,
    private correoService: CorreoArgentinoService) {
    this.form = this._formBuilder.group({
      direccion: [''],
      codigo_postal: ['', Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required]
    });
  }

  private calcularHashPedido(pedido: any): string {
    return JSON.stringify(pedido);
  }


  calcularCostoEnvio(): void {
    const cpOrigen = '5000';
    const provinciaOrigen = 'AR-X';
    const cpDestino = this.form.get('codigo_postal')?.value;
    const provinciaIngresada = this.form.get('provincia')?.value;
    const provinciaDestino = this.form.get('provincia')?.value;


    // Validación
    if (!cpDestino || cpDestino.length < 4) {
      this.errorMessage = 'Ingresa un código postal válido';
      return;
    }

    if (!provinciaDestino || provinciaDestino.trim().length < 3) {
      this.errorMessage = 'Ingresa una provincia válida';
      return;
    }

    // Limpiar mensajes de estado anteriores
    this.errorMessage = '';
    this.successMessage = '';

    const peso = this.getPesoTotal();
    console.log('Calculando envío para CP:', cpDestino, 'Provincia:', provinciaDestino); // Debug

    // Reset de opciones anteriores
    this.opcionesEnvio = [];
    this.sucursalesDisponibles = [];
    this.tipoEnvioSeleccionado = '';
    this.sucursalSeleccionada = null;
    this.envioCosto = 0;

    this.correoService.cotizarEnvio(cpOrigen, cpDestino, provinciaOrigen, provinciaDestino, peso).subscribe({
      next: (data) => {
        console.log('Respuesta cotización:', data); // Debug

        if (data?.paqarClasico?.aDomicilio) {
          this.opcionesEnvio.push({
            tipo: 'A domicilio',
            costo: Number(data.paqarClasico.aDomicilio),
            costoBase: Number(data.paqarClasico.aDomicilio)
          });
        }

        if (data?.paqarClasico?.aSucursal) {
          const costoSucursal = typeof data.paqarClasico.aSucursal === 'number' 
            ? data.paqarClasico.aSucursal 
            : data.paqarClasico.aSucursal.costo || 0;

          this.opcionesEnvio.push({
            tipo: 'A sucursal',
            costo: Number(costoSucursal),
            costoBase: Number(costoSucursal)
          });

          // 👉 Obtener sucursales con la provincia ingresada
          this.obtenerSucursales(provinciaDestino, Number(costoSucursal));
        }

        if (this.opcionesEnvio.length === 0) {
          this.errorMessage = 'No hay opciones de envío disponibles para este código postal y provincia';
        } else {
          this.successMessage = 'Opciones de envío calculadas correctamente';
        }

        console.log('Opciones de envío creadas:', this.opcionesEnvio);
      },
      error: (error) => {
        console.error('Error en cotización:', error);
        this.errorMessage = 'Error al calcular el costo de envío. Intenta nuevamente.';
        this.opcionesEnvio = [];
        this.sucursalesDisponibles = [];
      }
    });
  }


  obtenerSucursales(provincia: string, costoBase: number): void {
    this.sucursalesDisponibles = []; // Reset
    this.sucursalSeleccionada = null;
    this.sucursalSeleccionadaIndex = null;

    const localidadIngresada = (this.form.get('localidad')?.value || '').toUpperCase().trim();

    const headers = {
      'x-rapidapi-host': 'correo-argentino1.p.rapidapi.com',
      'x-rapidapi-key': '803b62e838mshb358622f22ad8e2p10f250jsn6f64206459b9'
    };

    this.http.get<any>(`https://correo-argentino1.p.rapidapi.com/obtenerSucursales?provincia=${provincia}`, { headers })
      .subscribe({
        next: (response) => {
          if (response && Array.isArray(response)) {
            this.sucursalesDisponibles = response
              .filter((sucursal: any) => {
                const localidadIngresada = this.form.get('localidad')?.value?.trim().toUpperCase();
                const localidadSucursal = sucursal.localidad?.toUpperCase() || sucursal.nombre_localidad?.toUpperCase() || '';
                return localidadSucursal.includes(localidadIngresada);
              })
              .map((sucursal: any, index: number) => ({
              index,
              codigo: sucursal.codigo_sucursal || 'SIN-CODIGO',
              nombre: sucursal.nombre_sucursal || 'Sucursal sin nombre',
              direccion: sucursal.nombre_sucursal || 'Dirección no disponible',
              provincia: sucursal.nombre_provincia || provincia,
              codigo_postal: sucursal.codigo_postal || '',
              telefono: sucursal.telefono || '',
              horarios: sucursal.horarios || '',
              costo: costoBase,
              localidad: sucursal.localidad || sucursal.nombre_localidad || '',
            }));

            console.log('✅ Sucursales parseadas:', this.sucursalesDisponibles);
          } else {
            this.sucursalesDisponibles = [];
            console.warn('⚠️ Respuesta inesperada de la API de sucursales');
          }
        },
        error: (error) => {
          console.error('❌ Error al obtener sucursales:', error);
          this.sucursalesDisponibles = [{
            codigo: 'GENERIC',
            nombre: 'Sucursal de Correo Argentino',
            direccion: 'Consultar en el local',
            localidad: 'Según código postal',
            provincia: provincia,
            codigo_postal: this.form.get('codigo_postal')?.value || '',
            telefono: '',
            horarios: 'L-V 9-17hs',
            costo: costoBase
          }];
        }
      });
  }

  seleccionarSucursalDesdeDropdown(event: Event): void {
    const index = Number((event.target as HTMLSelectElement).value);
    const sucursal = this.sucursalesDisponibles[index];

    if (sucursal) {
      this.sucursalSeleccionadaIndex = index;
      this.sucursalSeleccionada = sucursal;

      //  Asegurar que el costo se actualiza correctamente
      this.envioCosto = sucursal.costo || 0;

      //  Establecer dirección final de entrega (opcional)
      this.direccionEntrega = `${sucursal.nombre} - ${sucursal.direccion}`;

      //  Actualiza el estado para habilitar el botón de pago
      this.actualizarEstadoPago();
    }
  }

  onSeleccionarDireccionGuardada(event: Event): void {
    const id = +(event.target as HTMLSelectElement).value;
    const seleccionada = this.direccionesGuardadas.find(d => d.id === id);
    if (seleccionada) {
      this.form.get('direccion')?.setValue(seleccionada.calle);
      this.form.get('localidad')?.setValue(seleccionada.ciudad);
    }
  }


  onSeleccionarTipoEnvio(tipo: string): void {
    console.log('Tipo de envío seleccionado:', tipo); // Debug
    this.tipoEnvioSeleccionado = tipo;
    this.sucursalSeleccionada = null;
    this.envioCosto = 0; 

    // Reset del botón de MercadoPago cuando cambia el tipo de envío
    this.mercadoPagoButtonRendered = false;
    this.limpiarWalletContainer();
    
    if (tipo === 'A domicilio') {
      this.tipoEnvioId = 1;
      const opcionDomicilio = this.opcionesEnvio.find(o => o.tipo === 'A domicilio');
      this.envioCosto = opcionDomicilio ? Number(opcionDomicilio.costo) : 0;
      
      // Hacer requerido el campo dirección
      this.form.get('direccion')?.setValidators([Validators.required]);
      this.form.get('direccion')?.updateValueAndValidity();

       // 👇 NUEVO: cargar la dirección del usuario automáticamente
        this.userService.getNombreUsuario().subscribe(username => {
          if (username) {
            this.userService.getUsuario(username).subscribe(user => {
              const direccionGuardada = user?.direccion;
              if (direccionGuardada) {
                this.form.get('direccion')?.setValue(direccionGuardada);
                this.direccionEntrega = direccionGuardada;
              }
              if (user?.localidad) {
                this.form.get('localidad')?.setValue(user.localidad);
              }
            });

            // Obtener direcciones guardadas del backend
            this.direccionService.getDirecciones().subscribe(direcciones => {
              this.direccionesGuardadas = direcciones;
            });

          }
        });
      
      // Limpiar validaciones de sucursal (si las hay)
      this.direccionEntrega = '';
      
      console.log('Costo domicilio:', this.envioCosto); // Debug
      
    } else if (tipo === 'A sucursal') {
      this.tipoEnvioId = 2;
      
      // Remover validación de dirección
      this.form.get('direccion')?.clearValidators();
      this.form.get('direccion')?.updateValueAndValidity();
      this.form.get('direccion')?.setValue(''); // Limpiar valor
      
      // El costo se actualizará cuando seleccione la sucursal específica
      this.envioCosto = 0;
      this.direccionEntrega = '';
      
      console.log('Sucursales disponibles:', this.sucursalesDisponibles.length); // Debug
    }

    this.actualizarEstadoPago();
    this.generarWallet();

  }

  onSeleccionarSucursal(sucursal: any): void {
    console.log('Sucursal seleccionada:', sucursal); // Debug
    this.sucursalSeleccionada = sucursal;
    this.envioCosto = Number(sucursal.costo);

    // Reset del botón de MercadoPago cuando cambia la sucursal
    this.mercadoPagoButtonRendered = false;
    this.limpiarWalletContainer();
    
    // Construir dirección completa de la sucursal para el pedido
    this.direccionEntrega = `${sucursal.nombre} - ${sucursal.direccion}`;
    if (sucursal.localidad) {
      this.direccionEntrega += `, ${sucursal.localidad}`;
    }
    if (sucursal.codigo_postal) {
      this.direccionEntrega += ` (CP: ${sucursal.codigo_postal})`;
    }
    
    console.log('Costo sucursal:', this.envioCosto); // Debug
    console.log('Dirección construida:', this.direccionEntrega); // Debug
    this.actualizarEstadoPago();
    this.generarWallet();

  }

  puedeGenerarPago(): boolean {
    console.log('Verificando si puede generar pago...'); // Debug
    console.log('Tipo envío seleccionado:', this.tipoEnvioSeleccionado); // Debug
    console.log('Código postal:', this.form.get('codigo_postal')?.value); // Debug
    
    // Verificar que tenga código postal
    if (!this.form.get('codigo_postal')?.value) {
      console.log('Falta código postal'); // Debug
      return false;
    }
    
    // Verificar que tenga tipo de envío seleccionado
    if (!this.tipoEnvioSeleccionado) {
      console.log('Falta tipo de envío'); // Debug
      return false;
    }
    
    if (this.tipoEnvioSeleccionado === 'A domicilio') {
      const direccionValida = this.form.get('direccion')?.valid;
      const direccionTieneValor = this.form.get('direccion')?.value?.trim();
      console.log('Dirección válida:', direccionValida, 'Tiene valor:', direccionTieneValor); // Debug
      return direccionValida && direccionTieneValor;
      
    } else if (this.tipoEnvioSeleccionado === 'A sucursal') {
      const tieneSucursal = this.sucursalSeleccionada !== null;
      console.log('Tiene sucursal seleccionada:', tieneSucursal); // Debug
      return tieneSucursal;
    }
    
    return false;
  }

  generarPagoMercadoPago(): void {
    if (this.procesandoPago) {
      console.log('Ya se está procesando un pago...');
      return;
    }

    if (!this.puedeGenerarPago()) {
      this.errorMessage = 'Por favor completa todos los datos de envío';
      return;
    }

    this.procesandoPago = true;

    // Establecer la dirección final si es a domicilio
    if (this.tipoEnvioSeleccionado === 'A domicilio') {
      this.direccionEntrega = this.form.get('direccion')?.value;
    }

    const items = this.transformarItems(this.productosCarrito);
    const totalCalculado = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);

    const pedido = {
      items: items,
      external_reference: 'user', // será completado con username luego
      total: totalCalculado,
      datos_envio: {
        tipo_envio_id: this.tipoEnvioId,
        domicilio_envio: this.direccionEntrega,
        codigo_postal: this.form.get('codigo_postal')?.value,
        ciudad_envio: this.getNombreProvincia(this.form.get('provincia')?.value),
        costo_envio: this.envioCosto,
        sucursal_info: this.sucursalSeleccionada || null,
        descuento: this.getDescuentoTotal(),
        localidad: this.form.get('localidad')?.value

      }
    };

    const hash = this.calcularHashPedido(pedido);

    if (hash === this.hashUltimoPedido && this.ultimaPreferenciaGenerada && this.mercadoPagoButtonRendered) {
      console.log('Preferencia ya generada. Usando wallet actual.');
      return;
    }

    this.enviarPedidoAMercadoPago(pedido, hash);
  }


  private limpiarWalletContainer(): void {
    const walletContainer = document.getElementById('wallet_container');
    if (walletContainer) {
      // Destruir cualquier instancia previa de MercadoPago
      try {
        if (this.mp && this.mp.bricks) {
          // Intentar destruir bricks previos si existe el método
          const existingWallet = walletContainer.querySelector('.mp-wallet');
          if (existingWallet) {
            existingWallet.remove();
          }
        }
      } catch (error) {
        console.log('No hay wallet previo para limpiar');
      }
      
      walletContainer.innerHTML = '';
      this.mercadoPagoButtonRendered = false;
    }
  }

  getPesoTotal(): number {
    return this.productosCarrito.reduce((acc, item) => acc + (item.producto.peso * item.cantidad), 0);
  }

  ngOnInit(): void {
    this.cartService.productosCarrito.subscribe(productos => {
      this.productosCarrito = productos;
    });

    this.descuento = 10;
    this.tipoDescuento = 'porcentaje';

    // Inicializar MercadoPago con manejo de errores
    try {
      if (window.MercadoPago) {
        this.mp = new window.MercadoPago('APP_USR-5f241e38-0261-4a16-ad5e-d6d28e14ba69');
      } else {
        console.error('MercadoPago SDK no está cargado');
        this.errorMessage = 'Error al cargar el sistema de pagos. Recarga la página.';
      }
    } catch (error) {
      console.error('Error al inicializar MercadoPago:', error);
      this.errorMessage = 'Error al inicializar el sistema de pagos.';
    }

    // Inicializar walletInstance en null para evitar errores
    this.walletInstance = null;

    // Suscribirse a cambios del formulario
    this.form.valueChanges.subscribe(() => {
      this.actualizarEstadoPago();
    });

    // NO generar wallet automáticamente en ngOnInit
    // Solo cuando el usuario complete los datos de envío
  }

  ngAfterViewInit(): void {
    const walletContainer = document.getElementById('wallet_container');
    if (walletContainer) {
      walletContainer.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.pagarConMercadoPago();
      });
    }
  }

  crearPreferenciaMP(pedido: any): Observable<any> {
    this.procesandoPago = true;
    return this.http.post<any>('http://localhost:8000/api/preferencia/', pedido);
  }

  actualizarEstadoPago(): void {
    const tieneCP = this.form.get('codigo_postal')?.value?.length >= 4;
    const tipo = this.tipoEnvioSeleccionado;

    if (!tieneCP || !tipo) {
      this.esPagoPosible = false;
      return;
    }

    if (tipo === 'A domicilio') {
      const direccionValida = this.form.get('direccion')?.valid;
      const direccionTieneValor = this.form.get('direccion')?.value?.trim();
      this.esPagoPosible = direccionValida && direccionTieneValor;
    } else if (tipo === 'A sucursal') {
      this.esPagoPosible = this.sucursalSeleccionada !== null;
    }
  }


  renderMercadoPagoButton(preferenceId: string): void {
    const walletContainer = document.getElementById('wallet_container');
    if (!walletContainer) {
      console.error('wallet_container no encontrado');
      return;
    }

    walletContainer.style.display = 'block';
    walletContainer.innerHTML = '';
    this.mercadoPagoButtonRendered = false;

     // Usar setTimeout para asegurar que el DOM esté listo
    setTimeout(() => {
      // Verificar que mp esté inicializado
      if (!this.mp || !this.mp.bricks) {
        console.error('MercadoPago SDK no está inicializado correctamente');
        this.errorMessage = 'Error al inicializar el sistema de pagos.';
        return;
      }

      try {
        this.mp.bricks().create("wallet", "wallet_container", { // Sin el # - solo el ID
          initialization: {
            preferenceId: preferenceId
          },
          customization: {
            texts: {
              valueProp: 'smart_option'
            }
          }
        }).then(() => {
          this.mercadoPagoButtonRendered = true;
          console.log('Wallet renderizado correctamente');
        }).catch((error: any) => {
          console.error('Error al renderizar wallet:', error);
          this.errorMessage = 'Error al mostrar el botón de pago. Intenta nuevamente.';
          this.mercadoPagoButtonRendered = false;
        });
      } catch (error) {
        console.error('Error en la creación del wallet:', error);
        this.errorMessage = 'Error al inicializar el botón de pago.';
        this.mercadoPagoButtonRendered = false;
      }
    }, 100);
  }

  getDescuentoTotal(): number {
    const cupones: CuponAplicado[] = this.cartService.getCuponesAplicados();
    let totalDescuento = 0;
    let totalTemporal = this.calculateSubtotal();

    for (const cupon of cupones) {
      let descuento = 0;
      if (cupon.tipo_descuento === 'PORCENTAJE') {
        descuento = totalTemporal * (cupon.valor_descuento / 100);
      } else if (cupon.tipo_descuento === 'MONTO') {
        descuento = cupon.valor_descuento;
      }
      if (descuento > totalTemporal) descuento = totalTemporal;
      totalDescuento += descuento;
      totalTemporal -= descuento;
      if (totalTemporal <= 0) break;
    }

    return totalDescuento;
  }

  calculateSubtotal(): number {
    return this.productosCarrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  calculateTotalFinal(): number {
    const subtotal = this.calculateSubtotal();
    const descuento = this.getDescuentoTotal();
    const envio = this.envioCosto || 0;
    const totalFinal = subtotal - descuento + envio;
    return totalFinal < 0 ? 0 : totalFinal;
  }

  calculateDiscount(): number {
    const subtotal = this.calculateSubtotal();
    return this.tipoDescuento === 'porcentaje'
      ? subtotal * (this.descuento / 100)
      : this.descuento;
  }

  calculateTotal(): number {
    return this.productosCarrito.reduce((acc, productoCarrito) => acc + productoCarrito.producto.precio * productoCarrito.cantidad, 0);
  }

  removeFromCart(productoCarritoId: number): void {
    this.cartService.quitarProducto(productoCarritoId);
  }

  transformarItems(items: ICarrito[]): any[] {
    const itemsTransformados = items.map(item => ({
      title: item.producto.nombre,
      quantity: item.cantidad,
      unit_price: item.producto.precio
    }));

    const descuentoTotal = this.getDescuentoTotal();
    if (descuentoTotal > 0) {
      itemsTransformados.push({
        title: 'Descuento',
        quantity: 1,
        unit_price: -descuentoTotal
      });
    }
    return itemsTransformados;
  }

  irAlDashboard(): void {
    this.router.navigate(['http://localhost:4200/']);
  }

  logFormErrors(): void {
    Object.keys(this.form.controls).forEach(key => {
      const controlErrors = this.form.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Error en el control ' + key + ': ' + keyError);
        });
      }
    });
  }

  handlePagoExitoso(): void {
    this.authService.getUsername().subscribe({
      next: (username: string | null) => {
        if (!username) {
          this.errorMessage = 'Usuario no autenticado';
          return;
        }

        this.http.get<any>('http://localhost:8000/api/pago-exitoso').subscribe({
          next: (response) => {
            if (response.message === 'Pedido procesado correctamente') {
              console.log('Pago exitoso');
            } else {
              console.warn('Hubo un problema con el procesamiento del pago.');
            }
          },
          error: (err) => {
            console.error('Error al verificar el pago:', err);
            this.errorMessage = 'Hubo un error al verificar el pago.';
          },
          complete: () => {
            this.cuponService.eliminarCupones(username).subscribe({
              next: (res: any) => {
                console.log('Cupones del usuario eliminados:', res.mensaje);
                this.irAlInicio();
              },
              error: (err: any) => {
                console.error('Error al eliminar cupones:', err);
                this.irAlInicio();
              }
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener el nombre de usuario:', err);
        this.errorMessage = 'Error al obtener el nombre de usuario';
      }
    });
  }

  irAlInicio(): void {
    this.router.navigate(['/']);
  }

  eliminarCupones(username: string): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/mis-cupones/${username}/`);
  }

  pagarConMercadoPago(): void {
    this.authService.getUsername().subscribe({
      next: (username: string | null) => {
        if (!username) {
          console.error('Usuario no autenticado');
          return;
        }
        
        console.log('Botón clickeado, eliminando cupones para:', username);

        this.cuponService.eliminarCupones(username).subscribe({
          next: (res: any) => {
            console.log('Cupones eliminados:', res.mensaje);
          },
          error: (err) => {
            console.error('Error eliminando cupones:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error obteniendo usuario:', err);
      }
    });
  }

  private enviarPedidoAMercadoPago(pedido: any, hashPedido: string): void {
    this.procesandoPago = true;
    
    this.authService.getUsername().subscribe({
      next: (username: string | null) => {
        if (!username) {
          this.router.navigate(['/login']);
          this.procesandoPago = false;
          return;
        }

        pedido.external_reference = username;

        this.http.post<any>('http://localhost:8000/api/preferencia/', pedido).subscribe({
          next: (response) => {
            if (response && response.preference_id) {
              const preferenceId = response.preference_id;
              this.ultimaPreferenciaGenerada = preferenceId;
              this.hashUltimoPedido = hashPedido;

              // Limpiar container antes de renderizar
              this.limpiarWalletContainer();
              
              // Renderizar el botón
              this.renderMercadoPagoButton(preferenceId);
            } else {
              this.errorMessage = 'Error al obtener la preferencia de pago.';
              console.error('Respuesta inválida del servidor:', response);
            }
          },
          error: (err) => {
            console.error('Error al crear preferencia:', err);
            this.errorMessage = 'No se pudo iniciar el proceso de pago. Intenta nuevamente.';
          },
          complete: () => {
            this.procesandoPago = false;
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener username:', err);
        this.errorMessage = 'Error de autenticación. Inicia sesión nuevamente.';
        this.procesandoPago = false;
      }
    });
  }

  // Método para calcular el progreso del formulario
  getProgresoFormulario(): number {
    let progreso = 0;
    
    // Paso 1: Código postal (33.33%)
    if (this.form.get('codigo_postal')?.value && this.form.get('codigo_postal')?.value.length >= 4) {
      progreso += 33.33;
    }
    
    // Paso 2: Tipo de envío seleccionado (33.33%)
    if (this.tipoEnvioSeleccionado) {
      progreso += 33.33;
    }
    
    // Paso 3: Datos específicos completados (33.34%)
    if (this.tipoEnvioSeleccionado === 'A domicilio' && this.form.get('direccion')?.valid && this.form.get('direccion')?.value?.trim()) {
      progreso += 33.34;
    } else if (this.tipoEnvioSeleccionado === 'A sucursal' && this.sucursalSeleccionada) {
      progreso += 33.34;
    }
    
    return Math.round(progreso);
  }

  generarWallet(): void {
    if (!this.puedeGenerarPago()) {
      console.log('No se puede generar wallet: datos incompletos');
      return;
    }

    if (this.procesandoPago) {
      console.log('Ya se está procesando un pago...');
      return;
    }

    this.procesandoPago = true;

    const payload = {
      items: this.getItemsFormatoMP(),
      domicilio_envio: this.form.get('direccion')?.value || '',
      codigo_postal: this.form.get('codigo_postal')?.value || '',
      opcion_envio: this.opcionesEnvio.find(op => op.tipo === this.tipoEnvioSeleccionado) || {},
      external_reference: this.generarReferenciaExterna()
    };

    this.http.post<any>('http://localhost:8000/api/preferencia/', payload).subscribe({
      next: async (response) => {
        const preferenceId = response.preference_id;

        if (this.walletInstance) {
          this.walletInstance.unmount();
        }

        const bricksBuilder = this.mp.bricks();
        this.walletInstance = await bricksBuilder.create('wallet', 'wallet_container', {
          initialization: {
            preferenceId: preferenceId,
          },
          customization: {
            texts: {
              valueProp: 'smart_option',
            },
          },
        });

        this.successMessage = 'Botón de pago generado con éxito.';
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error al generar preferencia:', error);
        this.errorMessage = 'No se pudo generar el botón de pago.';
        this.successMessage = '';
      },
      complete: () => {
        this.procesandoPago = false;
      }
    });
  }

  generarReferenciaExterna(): string {
    const nombre_usuario = localStorage.getItem('user') || '';
    let direccion = '';

    if (this.tipoEnvioSeleccionado === 'A domicilio') {
      direccion = this.form.get('direccion')?.value || '';
    } else if (this.tipoEnvioSeleccionado === 'A sucursal' && this.sucursalSeleccionada) {
      direccion = `${this.sucursalSeleccionada.nombre} - ${this.sucursalSeleccionada.direccion}`;
    }

    const cp = this.form.get('codigo_postal')?.value || '';
    const provincia = this.getNombreProvincia(this.form.get('provincia')?.value);
    const tipoEnvioId = this.tipoEnvioId;
    const envio = JSON.stringify(this.opcionesEnvio.find(op => op.tipo === this.tipoEnvioSeleccionado) || {});
    const descuento = this.getDescuentoTotal();
    const localidad = (this.form.get('localidad')?.value || '').toUpperCase();

    return `${nombre_usuario}|${direccion}|${cp}|${envio}|${this.calculateTotalFinal()}|${tipoEnvioId}|${provincia}|${descuento}|${localidad}`;
  }


  getItemsFormatoMP() {
    const itemsTransformados = this.productosCarrito.map((p) => ({
      title: p.producto.nombre,
      quantity: p.cantidad || 1,
      unit_price: p.producto.precio,
    }));

    // Agregar costo de envío como ítem adicional si existe
    if (this.envioCosto > 0) {
      itemsTransformados.push({
        title: 'Costo de envío',
        quantity: 1,
        unit_price: this.envioCosto
      });
    }

    // Agregar descuento como ítem negativo si existe
    const descuentoTotal = this.getDescuentoTotal();
    if (descuentoTotal > 0) {
      itemsTransformados.push({
        title: 'Descuento aplicado',
        quantity: 1,
        unit_price: -descuentoTotal
      });
    }

    return itemsTransformados;
  }

  getNombreProvincia(codigo: string): string {
    const provincias: { [key: string]: string } = {
      'AR-B': 'Buenos Aires',
      'AR-C': 'CABA',
      'AR-K': 'Catamarca',
      'AR-H': 'Chaco',
      'AR-U': 'Chubut',
      'AR-X': 'Córdoba',
      'AR-W': 'Corrientes',
      'AR-E': 'Entre Ríos',
      'AR-P': 'Formosa',
      'AR-Y': 'Jujuy',
      'AR-L': 'La Pampa',
      'AR-F': 'La Rioja',
      'AR-M': 'Mendoza',
      'AR-N': 'Misiones',
      'AR-Q': 'Neuquén',
      'AR-R': 'Río Negro',
      'AR-A': 'Salta',
      'AR-J': 'San Juan',
      'AR-D': 'San Luis',
      'AR-Z': 'Santa Cruz',
      'AR-S': 'Santa Fe',
      'AR-G': 'Santiago del Estero',
      'AR-V': 'Tierra del Fuego',
      'AR-T': 'Tucumán'
    };
    return provincias[codigo] || codigo;
  }

  buscarSucursalesFiltradas(): void {
    const provincia = this.form.get('provincia')?.value;
    const localidad = this.form.get('localidad')?.value?.toUpperCase() || '';
    const costoSucursal = this.opcionesEnvio.find(o => o.tipo === 'A sucursal')?.costo || 0;


    if (!provincia || !localidad) {
      this.errorMessage = 'Debe ingresar una localidad y una provincia válidas.';
      return;
    }

    const headers = {
      'x-rapidapi-host': 'correo-argentino1.p.rapidapi.com',
      'x-rapidapi-key': '803b62e838mshb358622f22ad8e2p10f250jsn6f64206459b9'
    };

    this.http.get<any>(`https://correo-argentino1.p.rapidapi.com/obtenerSucursales?provincia=${provincia}`, { headers })
      .subscribe({
        next: (response) => {
          if (response && Array.isArray(response)) {
            const filtradas = response.filter((s: any) =>
              s.nombre_sucursal?.toUpperCase().includes(localidad)
            );

            this.sucursalesDisponibles = response
            .filter((s: any) => s.nombre_sucursal?.toUpperCase().includes(localidad.toUpperCase()))
            .map((sucursal: any, index: number) => ({
              index,
              nombre: sucursal.nombre_sucursal || 'Sucursal sin nombre',
              direccion: sucursal.nombre_sucursal || 'Dirección no disponible',
              provincia: sucursal.nombre_provincia || '',
              localidad: sucursal.localidad || '',
              codigo_postal: sucursal.codigo_postal || '',
              telefono: sucursal.telefono || '',
              horarios: sucursal.horarios || '',
              costo: costoSucursal, // ✅ esto es clave
            }));

            this.successMessage = `Se encontraron ${this.sucursalesDisponibles.length} sucursales en "${localidad}"`;
          } else {
            this.sucursalesDisponibles = [];
            this.errorMessage = 'No se encontraron sucursales en esa localidad.';
          }
        },
        error: (err) => {
          console.error('Error al buscar sucursales:', err);
          this.errorMessage = 'Error al consultar sucursales.';
        }
      });
  }




}