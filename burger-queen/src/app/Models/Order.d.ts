import { Product } from './Produto';

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
