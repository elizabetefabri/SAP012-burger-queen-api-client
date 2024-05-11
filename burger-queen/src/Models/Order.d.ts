import { Product } from './Produto.d';

export interface Order {
  id: number;
  userId: number;
  client: string;
  items: Item[];
}

export interface Item {
  product: Product;
  quantity: number;
}
