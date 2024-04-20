export interface Order {
  id: number;
  userId: number;
  client: string;
  products: OrderProduct[];
}

export interface OrderProduct {
  qty: number;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  dateEntry: string;
}
