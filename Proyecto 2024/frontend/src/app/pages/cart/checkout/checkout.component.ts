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
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
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
      const paymentDetails = {
        cardNumber: this.form.value.cardNumber,
        expirationDate: this.form.value.expiration,
        cvv: this.form.value.cvv
      };

      const itemsComprados: ICarrito[] = this.cartService.obtenerProductosCarrito();
      console.log('Items Comprados:', itemsComprados);  // Verificar productos
      console.log('Payment Details:', paymentDetails);  // Verificar detalles de pago
      this.cartService.checkout(itemsComprados, paymentDetails).subscribe(
        data => {
          this.successMessage = 'Procesamiento de pago exitoso';
          this.errorMessage = ''; // Limpiar mensaje de error
          this.form.reset(); // Limpiar el formulario después del éxito
        },
        error => {
          this.errorMessage = 'Error al procesar el pago';
          this.successMessage = ''; // Limpiar mensaje de éxito
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
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