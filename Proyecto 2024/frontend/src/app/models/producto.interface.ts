export interface IProducto {
    id_producto : number,
    nombre : string,
    descripcion : string,
    precio : number,
    stock_actual : number,
    stock_minimo : number,
    id_proveedor : number,
    id_categoria_producto : number,
    image_url : string;
    peso:number;
}