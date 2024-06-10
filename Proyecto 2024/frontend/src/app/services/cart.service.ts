import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProducto } from '../models/producto.interface';
import { AuthService } from './auth.service';
import { ICarrito } from '../models/carrito.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api/'; // URL base de la API
  private addToCartUrl = this.apiUrl + 'add-to-cart/';
  private cartUrl = this.apiUrl + 'cart/';
  private checkoutUrl = '';
  private productsSubject: BehaviorSubject<ICarrito[]> = new BehaviorSubject<ICarrito[]>([]);
  public products$: Observable<ICarrito[]> = this.productsSubject.asObservable();

  constructor(private readonly httpClient : HttpClient) { }

  getProducts(): Observable<ICarrito[]> {
    const username = localStorage.getItem("user");
    const url = this.cartUrl + username
    return this.httpClient.get<ICarrito[]>(url);
  }

  addToCart(product: IProducto): Observable<any> {
    return this.httpClient.post(this.addToCartUrl, { 
      id_producto: product.id_producto,
      nombre_usuario: localStorage.getItem("user"),
      cantidad: 1
     });
  }


  checkout(): Observable<any> {
    return this.httpClient.post(this.checkoutUrl, {});
  }
  
  removeProduct(productId: number): Observable<any> {
    return this.httpClient.delete(`${this.cartUrl}/${productId}`);
  }

  processPayment(paymentDetails: { cardNumber: string; expirationDate: string; cvv: string }): Observable<any> {
    // Aquí llamamos a la API para procesar el pago. Ajusta la URL y el formato según tu backend.
    return this.httpClient.post<any>('/api/payment', paymentDetails);
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
