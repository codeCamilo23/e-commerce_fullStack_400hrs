export interface Products {
  _id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagen?: string;
  categoria: string;
  estado: boolean;
  cantidad: number;
  disponible?: boolean;
}
