export interface IPedido {
    id_pedido: number,
    fecha: Date,
    id_estado_pedido: number,
    nombre_usuario: string,
    id_tipo_de_envio: number,
    domicilio_envio: string,
    id_forma_de_pago: number,
    numero_pedido: number,
    costo_envio:number,
    total: number,
    codigo_postal: string,
    ciudad_envio:string,
    descuento:number,
    localidad: string
}