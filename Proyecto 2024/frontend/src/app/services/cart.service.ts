import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProducto } from '../models/producto.interface';
import { ICarrito } from '../models/carrito.interface';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api/'; // URL base de la API
  private addToCartUrl = this.apiUrl + 'add-to-cart/';
  private cartUrl = this.apiUrl + 'cart/';
  private deleteFromCartUrl = this.apiUrl + 'delete-from-cart/';
  private checkoutUrl =  this.apiUrl + 'checkout/';
 
  private productosCarritoSubject: BehaviorSubject<ICarrito[]> = new BehaviorSubject<ICarrito[]>([]);
  public productosCarrito: Observable<ICarrito[]> = this.productosCarritoSubject.asObservable();

  constructor(private readonly httpClient : HttpClient) { 
    this.actualizarCarrito();
  }

  actualizarCarrito() {
    const username = localStorage.getItem("user");
    const url = this.cartUrl + username
    this.httpClient.get<ICarrito[]>(url).subscribe((products) => {
      console.log('Productos obtenidos del carrito:', products);
      this.productosCarritoSubject.next(products);
    });
  }

  agregarProducto(product: IProducto): Observable<any> {
    return this.httpClient.post(this.addToCartUrl, { 
      id_producto: product.id_producto,
      nombre_usuario: localStorage.getItem("user"),
      cantidad: 1
     });
  }

  quitarProducto(productoCarritoId:number):void {
    this.httpClient.delete(`${this.deleteFromCartUrl}${productoCarritoId}`).subscribe(() => {
      this.actualizarCarrito();
    });
  }

  checkout(pedidoData : any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any>(this.checkoutUrl, pedidoData, { headers });
  }
  
  limpiarCarrito(): void {
    this.productosCarritoSubject.next([]);
  }

  obtenerProductosCarrito(): ICarrito[] {
  return this.productosCarritoSubject.value;
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
