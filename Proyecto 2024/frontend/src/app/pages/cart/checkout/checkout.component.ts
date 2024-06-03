import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CartService} from '../../../services/cart.service';
import { Product } from '../../../services/models/product-api.interface';
import { NgFor, NgIf } from '@angular/common';
import { IProducto } from '../../../models/producto.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink,RouterOutlet, ReactiveFormsModule,NgFor, NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  successMessage: string = 'Pago procesado exitosamente'; // Inicialización para evitar errores de tipo indefinido
  errorMessage: string = 'Error en procesar el pago'; // Inicialización para evitar errores de tipo indefinido

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
  productos: IProducto[] = [];
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
    this.cartService.products$.subscribe(products => {
      this.productos = products;
    });
  }
  
  calculateTotal(): number {
    return this.productos.reduce((acc, product) => acc + product.precio * product.id_producto, 0);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeProduct(productId).subscribe(() => {
      this.cartService.getProducts().subscribe(products => {
        this.productos = products;
      });
    });
  }

  onEnviar(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const paymentDetails = {
        cardNumber: this.form.value.cardNumber,
        expirationDate: this.form.value.expiration,
        cvv: this.form.value.cvv
      };

      this.cartService.processPayment(paymentDetails).subscribe(
        data => {
          this.successMessage = 'Payment successful!';
          this.router.navigate(['/order-confirmation']);
        },
        error => {
          this.errorMessage = 'Payment failed. Please try again.';
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