import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product-api.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = ''; // URL base de la API
  private cartUrl = ''; // Assuming a single cart for now
  private checkoutUrl = '';
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private readonly httpClient : HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.cartUrl);
  }

  addToCart(product: Product): Observable<any> {
    return this.httpClient.post(`${this.cartUrl}add_to_cart/`, { product_id: product.id, quantity: 1 });
  }



  checkout(): Observable<any> {
    return this.httpClient.post(this.checkoutUrl, {});
  }
  
  removeProduct(productId: number): Observable<any> {
    return this.httpClient.delete(`${this.cartUrl}/${productId}`);
  }
  /*
  getPaymentMethods(): Observable<any> {
    return this.http.get(`${this.apiUrl}/forma-de-pago/`);
  }

  getShippingMethods(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tipo-envio/`);
  }

  checkout(paymentMethodId: number, shippingMethodId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedidos/checkout/`, { forma_de_pago_id: paymentMethodId, tipo_envio_id: shippingMethodId });
  }
 } */
}
