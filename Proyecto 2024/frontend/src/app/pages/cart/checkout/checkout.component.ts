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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink,RouterOutlet, ReactiveFormsModule,NgFor, NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  successMessage: string = ''; // Inicialización para evitar errores de tipo indefinido
  errorMessage: string = ''; // Inicialización para evitar errores de tipo indefinido


  productosCarrito: ICarrito[] = [];
  form!: FormGroup;
  public mp: any; 

  constructor(private _formBuilder: FormBuilder,
    private cartService: CartService,
    private authService : AuthService, 
    private router: Router,
    private http: HttpClient) {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(19), Validators.maxLength(19)]],
      expiration: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }

  ngOnInit(): void {
    this.cartService.productosCarrito.subscribe(productosCarrito => {
      this.productosCarrito = productosCarrito;
    });
  
    this.mp = new window.MercadoPago('TEST-b6a47a1d-7ac3-4cbd-9b6b-4419f6198fc9');
  
    // Inicializamos el Brick luego de asegurarnos que el DOM está listo
    setTimeout(() => {
      this.mp.bricks().create('cardPayment', 'paymentBrick_container', {
        initialization: {
          amount: this.calculateTotal() + 20, // Total real
        },
        customization: {
          paymentMethods: {
            ticket: 'all',
            bankTransfer: 'all',
            creditCard: 'all'
          }
        },
        callbacks: {
          onReady: () => {
            console.log('Brick cargado correctamente');
          },
          onSubmit: (formData: any) => {
            console.log('Datos del Brick recibidos:', formData);
          
            const itemsComprados = this.cartService.obtenerProductosCarrito();
            const itemsTransformados = this.transformarItems(itemsComprados);
          
            if (itemsTransformados.length === 0) {
              this.errorMessage = 'El carrito está vacío';
              return;
            }
          
            this.authService.getUsername().subscribe(
              (username: string | null) => {
                if (!username) {
                  this.router.navigate(['/login']);
                  return;
                }
          
                const pedidoData = {
                  nombre_usuario: username,
                  items_comprados: itemsTransformados,
                  payment_details: {
                    transaction_amount: this.calculateTotal() + 20,
                    token: formData.token,
                    payment_method_id: formData.payment_method_id,
                    description: 'Compra en Pet Boutique',
                    installments: formData.installments,
                    cardholderEmail: formData.payer.email,
                    cardholderName: formData.payer.name,
                    identificationType: formData.payer.identification.type,
                    identificationNumber: formData.payer.identification.number
                  }
                };
                console.log("Datos que se están enviando al backend:", pedidoData);
          
                this.http.post('http://localhost:8000/api/checkout/', pedidoData).subscribe(
                  (                  response: any) => {
                    console.log('Pago exitoso y pedido registrado:', response);
                    this.cartService.limpiarCarrito();
                    this.successMessage = '¡Compra realizada con éxito!';
                    this.errorMessage = '';
                  },
                  (                  error: any) => {
                    console.error('Error al registrar el pedido:', error);
                    this.errorMessage = 'Error al procesar el pedido.';
                  }
                );
              },
              error => {
                console.error('Error al obtener usuario:', error);
                this.errorMessage = 'Error al autenticar al usuario';
              }
            );
          },
          onError: (error: any) => {
            console.error('Error al cargar el Brick:', error);
          }
        }
      });
    }, 300); // Pequeño delay para asegurar que el div está en el DOM
  }



  calculateTotal(): number {
    return this.productosCarrito.reduce((acc, productoCarrito) => acc + productoCarrito.producto.precio * productoCarrito.cantidad, 0);
  }

  removeFromCart(productoCarritoId: number): void {
    this.cartService.quitarProducto(productoCarritoId);
  }
  private transformarItems(items: any[]): any[] {
    // Transforma los items del carrito para que solo contengan id_producto y cantidad
    return items.map(item => ({
      id_producto: item.id_producto,
      cantidad: item.cantidad
    }));
  }

  /*
  onEnviar(event: Event): void {
    console.log('Botón de envío clickeado'); // Verificar si la función se ejecuta al hacer clic en el botón
    event.preventDefault();
    if (this.form.valid) {
        console.log('Formulario válido'); // Verificar que el formulario es válido
        const paymentDetails = {
            cardNumber: this.form.value.cardNumber.replace(/\s+/g, ''),
            expirationDate: this.form.value.expiration,
            cvv: this.form.value.cvv
        };

      const itemsComprados: any[] = this.cartService.obtenerProductosCarrito();
      console.log('Items Comprados antes de transformación:', itemsComprados);  // Verificar productos antes de transformación

      // Transformar los items comprados para enviar solo id_producto y cantidad
      const itemsCompradosTransformados = this.transformarItems(itemsComprados);
      console.log('Items Comprados después de transformación:', itemsCompradosTransformados);  // Verificar productos después de transformación

        console.log('Payment Details:', paymentDetails);  // Verificar detalles de pago

        if (itemsCompradosTransformados.length === 0) {
            console.log('El carrito está vacío'); // Verificar si hay productos en el carrito
            this.errorMessage = 'El carrito está vacío';
            return;
        }
        this.authService.getUsername().subscribe(
          (username: string | null) => { // Inicio del suscribe de getUsername()
            if (username) {
              console.log('Usuario autenticado:', username);
              const pedidoData = {
                nombre_usuario: username,
                items_comprados: itemsCompradosTransformados,
                payment_details: paymentDetails
              };
    
              // Hacer checkout de los productos
              this.cartService.checkout(pedidoData).subscribe(
                data => { // Inicio del suscribe de checkout()
                  console.log('Respuesta del servidor:', data);
                  this.successMessage = 'Procesamiento de pago exitoso';
                  this.errorMessage = ''; // Limpiar mensaje de error si hubiera
                  this.form.reset(); // Reiniciar formulario después de éxito
                  this.cartService.limpiarCarrito();
                },
                error => { // Fin del suscribe de checkout(), inicio del error handler
                  console.log('Error del servidor:', error);
                  this.errorMessage = 'Error al procesar el pago';
                  this.successMessage = ''; // Limpiar mensaje de éxito si hubiera
                } // Fin del error handler
              ); // Fin del suscribe de checkout()
    
            } else {
              // Si no hay usuario autenticado, manejar el caso aquí
              console.log('Usuario no autenticado');
              this.errorMessage = 'Usuario no autenticado';
              // Puedes redirigir a la página de inicio de sesión u otra acción
              this.router.navigate(['/login']);
            }
          }, // Fin del suscribe de getUsername(), inicio del error handler
          error => {
            console.log('Error al obtener el nombre de usuario:', error);
            this.errorMessage = 'Error al obtener el nombre de usuario';
            // Manejar el error si falla la obtención del nombre de usuario
          } // Fin del error handler
        ); // Fin del suscribe de getUsername()
    
      } else {
        console.log('Formulario inválido');
        this.form.markAllAsTouched(); // Marcar todos los campos del formulario como tocados
        this.logFormErrors(); // Aquí podrías llamar a una función para manejar los errores del formulario si fuera necesario
      }
    }*/


  irAlDashboard(): void {
    this.router.navigate(['/dashboard']); // Redirigir al dashboard
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
