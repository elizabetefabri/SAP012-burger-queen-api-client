import { Product } from './Produto';

export interface Order {
  id?: number;
  userId: number;
  client: string;
  clientId: string;
  items: Item[];
  status: string;
  dateEntry: string;
  dateProcessed?: string;
  preparationTime?: string;
  mesaId: string;
}

export interface Item {
  product: Product;
  quantity: number;
}
