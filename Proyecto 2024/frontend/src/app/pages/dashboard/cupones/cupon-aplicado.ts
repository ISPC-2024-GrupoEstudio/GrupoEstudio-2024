export interface CuponAplicado {
    id: number;
    nombre: string;
    tipo_descuento: 'PORCENTAJE' | 'MONTO';
    valor_descuento: number;
  }
  