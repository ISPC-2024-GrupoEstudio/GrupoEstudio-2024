import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CartService} from '../../../services/cart.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ICarrito } from '../../../models/carrito.interface';

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

  /*
  paymentMethods: any[] = [];
  shippingMethods: any[] = [];
  selectedPaymentMethod: number;
  selectedShippingMethod: number;
  cart: any; y para el constructor:
   this.cartService.getPaymentMethods().subscribe(methods => {
      this.paymentMethods = methods;
    });
    this.cartService.getShippingMethods().subscribe(methods => {
      this.shippingMethods = methods;
    });
      y para el  onEnviar(): void {
    this.cartService.checkout(this.selectedPaymentMethod, this.selectedShippingMethod).subscribe(response => {
      console.log('Checkout successful', response);
    });
  }
}
   */
  productosCarrito: ICarrito[] = [];
  form!: FormGroup;

  constructor(private _formBuilder: FormBuilder,private cartService: CartService, private router: Router) {
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
  }

  calculateTotal(): number {
    return this.productosCarrito.reduce((acc, productoCarrito) => acc + productoCarrito.producto.precio * productoCarrito.cantidad, 0);
  }

  removeFromCart(productoCarritoId: number): void {
    this.cartService.quitarProducto(productoCarritoId);
  }

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

        const itemsComprados: ICarrito[] = this.cartService.obtenerProductosCarrito();
        console.log('Items Comprados:', itemsComprados);  // Verificar productos
        console.log('Payment Details:', paymentDetails);  // Verificar detalles de pago

        if (itemsComprados.length === 0) {
            console.log('El carrito está vacío'); // Verificar si hay productos en el carrito
            this.errorMessage = 'El carrito está vacío';
            return;
        }

        this.cartService.checkout(itemsComprados, paymentDetails).subscribe(
            data => {
                console.log('Respuesta del servidor:', data); // Verificar respuesta del servidor
                this.successMessage = 'Procesamiento de pago exitoso';
                this.errorMessage = ''; // Limpiar mensaje de error
                this.form.reset(); // Limpiar el formulario después del éxito
            },
            error => {
                console.log('Error del servidor:', error); // Verificar error del servidor
                this.errorMessage = 'Error al procesar el pago';
                this.successMessage = ''; // Limpiar mensaje de éxito
            }
        );
    } else {
        console.log('Formulario inválido'); // Verificar que el formulario es inválido
        this.form.markAllAsTouched();
        this.logFormErrors(); // Llamar a la función para registrar los errores del formulario
    }
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