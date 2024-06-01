import { ICategoria } from "./categoria.interface";
import { IProveedor } from "./proveedor.interface";

export interface IProducto {
    idproducto : number,
    nombre : string,
    descripcion : string,
    precio : number,
    stock_actual : number,
    stock_min : number,
    proveedor : IProveedor, 
    categoria : ICategoria
}