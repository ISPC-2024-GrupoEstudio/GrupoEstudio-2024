export interface ArrepentimientoRequest {
  nombre: string;
  email: string;
  numeroPedido: string;
  fechaCompra: string;
  motivo?: string;
}