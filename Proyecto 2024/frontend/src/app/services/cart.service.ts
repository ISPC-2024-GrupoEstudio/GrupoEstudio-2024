import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProducto } from '../models/producto.interface';
import { ICarrito } from '../models/carrito.interface';
import { catchError } from 'rxjs/operators'; 
import { CuponAplicado } from '../pages/dashboard/cupones/cupon-aplicado';

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

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Token no encontrado');
      return new HttpHeaders(); // Devolver cabeceras vacías si no hay token
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  actualizarCarrito() {
    const username = localStorage.getItem("user");
    const url = this.cartUrl + username
    const token = localStorage.getItem('access_token');  // Obtener el token desde localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (!token) {
      console.error("No token found");
      return; // No hacer la solicitud si no hay token
    }

    this.httpClient.get<ICarrito[]>(url, { headers }).pipe(  // <-- AQUÍ AGREGAMOS headers
      catchError(error => {
        console.error('Error al obtener el carrito:', error);
        return of([]); 
      })
    ).subscribe((products) => {
      console.log('Productos obtenidos del carrito:', products);
      this.productosCarritoSubject.next(products);
    });
  }

  agregarProducto(product: IProducto): Observable<any> {
    const token = localStorage.getItem('access_token');  // Obtener el token desde localStorage
    console.log('Token recuperado del localStorage:', token); 
    if (!token) {
      console.error('Token no encontrado');
      return new Observable(observer => {
        observer.error('Token no encontrado');
        observer.complete();
      });
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(this.addToCartUrl, { 
      id_producto: product.id_producto,
      nombre_usuario: localStorage.getItem("user"),
      cantidad: 1
    }, { headers }).pipe(
      tap(() => {
        this.actualizarCarrito();
      }),
      catchError((error) => {
        console.error('Error al agregar producto al carrito:', error);
        throw error;
      })
    );
  }

  quitarProducto(productoCarritoId:number):void {
    const token = localStorage.getItem('access_token');  // Obtener el token desde localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.httpClient.delete(`${this.deleteFromCartUrl}${productoCarritoId}`).subscribe(() => {
      this.actualizarCarrito();
    });
  }

  checkout(pedidoData : any): Observable<any> {
    const token = localStorage.getItem('access_token');  // Obtener el token desde localStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<any>(this.checkoutUrl, pedidoData, { headers });
  }
  
  limpiarCarrito(): void {
    this.productosCarritoSubject.next([]);
  }

  obtenerProductosCarrito(): ICarrito[] {
  return this.productosCarritoSubject.value;
  }

  private cuponAplicadoSubject = new BehaviorSubject<CuponAplicado | null>(null);
  cuponAplicado$ = this.cuponAplicadoSubject.asObservable();

  aplicarCupon(cupon: CuponAplicado) {
    this.cuponAplicadoSubject.next(cupon);
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
