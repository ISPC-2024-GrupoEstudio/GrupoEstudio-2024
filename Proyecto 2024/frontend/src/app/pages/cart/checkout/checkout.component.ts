import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    MercadoPago: any;
  }
}
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CartService} from '../../../services/cart.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ICarrito } from '../../../models/carrito.interface';
import { AuthService } from '../../../services/auth.service';
import { CuponAplicado } from '../../dashboard/cupones/cupon-aplicado';
import { CuponService } from '../../../services/cupon.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule,NgFor, NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements AfterViewInit{
  successMessage: string = ''; // Inicialización para evitar errores de tipo indefinido
  errorMessage: string = ''; // Inicialización para evitar errores de tipo indefinido


  productosCarrito: ICarrito[] = [];
  form!: FormGroup;
  descuento: number = 0; // en porcentaje o monto fijo
  tipoDescuento: 'porcentaje' | 'monto' = 'porcentaje'; // ajusta esto según el tipo de cupón
  public mp: any; 

  constructor(private _formBuilder: FormBuilder,
    private cartService: CartService,
    private authService : AuthService, 
    private cuponService : CuponService, 
    private router: Router,
    private http: HttpClient,) {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(19), Validators.maxLength(19)]],
      expiration: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }
  ngAfterViewInit(): void {
  const walletContainer = document.getElementById('wallet_container');
  if (walletContainer) {
    walletContainer.addEventListener('click', (event) => {
      event.preventDefault();    
      event.stopPropagation();     

      console.log('Click detectado en wallet_container');
      this.pagarConMercadoPago();
    });
  }
}


  ngOnInit(): void {
  this.cartService.productosCarrito.subscribe(productosCarrito => {
    this.productosCarrito = productosCarrito;
  });

  
  

  // Simulación: ejemplo de cupón aplicado
  this.descuento = 10; // 10% de descuento
  this.tipoDescuento = 'porcentaje'; // o 'monto'

  // Inicializa el SDK de MercadoPago
  this.mp = new window.MercadoPago('APP_USR-5f241e38-0261-4a16-ad5e-d6d28e14ba69'); // Reemplaza por tu clave pública de producción

  // Obtenemos el preferenceId desde el backend
  const itemsComprados = this.cartService.obtenerProductosCarrito();
  const itemsTransformados = this.transformarItems(itemsComprados);

  this.authService.getUsername().subscribe((username: string | null) => {
    if (!username) {
      this.router.navigate(['/login']);
      return;
    }
    console.log('Items transformados:', itemsTransformados);

    const pedido = {
    items: itemsTransformados,
    external_reference: username
    };

    console.log('Pedido que se envía al backend:', pedido);

    this.http.post<any>('http://localhost:8000/api/preferencia/', pedido).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response); 
        const preferenceId = response.preference_id;
        this.renderMercadoPagoButton(preferenceId);
      },
      error: (err) => {
        console.error('Error al crear la preferencia:', err);
        this.errorMessage = 'No se pudo iniciar el proceso de pago.';
      }
    });
  });
  }

  renderMercadoPagoButton(preferenceId: string): void {
  this.mp.bricks().create("wallet", "wallet_container", {
    initialization: {
      preferenceId: preferenceId
    },
    customization: {
      texts: {
        valueProp: 'smart_option'
      }
    }
  });
}


getDescuentoTotal(): number {
  const cupones: CuponAplicado[] = this.cartService.getCuponesAplicados();
  let totalDescuento = 0;
  let totalTemporal = this.calculateSubtotal(); // subtotal base

  for (const cupon of cupones) {
    let descuento = 0;

    if (cupon.tipo_descuento === 'PORCENTAJE') {
      descuento = totalTemporal * (cupon.valor_descuento / 100);
    } else if (cupon.tipo_descuento === 'MONTO') {
      descuento = cupon.valor_descuento;
    }

    // Evita que el descuento exceda el total restante
    if (descuento > totalTemporal) {
      descuento = totalTemporal;
    }

    totalDescuento += descuento;
    totalTemporal -= descuento;

    if (totalTemporal <= 0) {
      break; // Ya no se puede aplicar más descuento
    }
  }

  return totalDescuento;
}


calculateSubtotal(): number {
  return this.productosCarrito.reduce((acc, productoCarrito) =>
    acc + productoCarrito.producto.precio * productoCarrito.cantidad, 0);
}

calculateTotalFinal(): number {
  const subtotal = this.calculateSubtotal();
  const descuento = this.getDescuentoTotal();
  // const envio = 20.00; 

  // const totalFinal = subtotal - descuento + envio;
  const totalFinal = subtotal - descuento;
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

//   private transformarItems(items: ICarrito[]): any[] {
//   return items.map(item => ({
//     title: item.producto.nombre,
//     quantity: item.cantidad,
//     unit_price: item.producto.precio
//   }));
// }
  private transformarItems(items: ICarrito[]): any[] {
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

      // Llamamos a eliminar cupones
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



  get Name(){
    return this.form.get("name")
  }

  get Cardnumber(){
    return this.form.get("cardNumber")
  }

  get Expiration(){
    return this.form.get("expiration")
  }
  get Cvv(){
    return this.form.get("cvv")
  }
}
