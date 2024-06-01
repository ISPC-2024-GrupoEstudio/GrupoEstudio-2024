import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CartService} from '../../../services/cart.service';
import { Product } from '../../../services/models/product-api.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink,RouterOutlet, ReactiveFormsModule,NgFor],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
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
  products: Product[] = [];
  form!: FormGroup;
  constructor(private _formBuilder: FormBuilder,private cartService: CartService) {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expiration: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
  });
  }
  ngOnInit(): void {
    this.cartService.products$.subscribe(products => {
      this.products = products;
    });
  }
  
  calculateTotal(): number {
    return this.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeProduct(productId).subscribe(() => {
      this.cartService.getProducts().subscribe(products => {
        this.products = products;
      });
    });
  }

  onEnviar(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      console.log(this.form.value);
      alert('Finalizando compra...');
      this.cartService.checkout().subscribe(response => {
        console.log('Compra finalizada:', response);
        // Lógica adicional después de finalizar la compra
      });
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