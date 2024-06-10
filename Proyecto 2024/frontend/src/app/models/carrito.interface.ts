import { IProducto } from "./producto.interface";

export interface ICarrito{
    id_carrito:number;
    id_producto:number;
    nombre_usuario:string;
    cantidad:number;
    producto:IProducto;
}