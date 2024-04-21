import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';
import { Products } from 'src/Models/Produto';

@Component({
  selector: 'app-cards-pedido',
  templateUrl: './cards-pedido.component.html',
  styleUrls: ['./cards-pedido.component.css']
})
export class CardsPedidoComponent implements OnInit{
  @Input() type: string = '';
  @Input() products: Products[] = [];
  // @Input() beverages: Products[] = [];
  // @Input() lunch: Products[] = [];
  // @Input() breakfast: Products[] = [];
  @Input() selectedProducts: { product: Products, quantity: number }[] = [];

  total: number = 0;

  // selectedProducts: { product: Products, quantity: number }[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.listProductsByType(this.type).subscribe({
      next: (data: Products[]) => {
        console.log(this.type, data);
        this.products = data;
      },
      error: (error) => {
        console.log('Erro ao carregar os produtos: ', error);
      }
    });
  }

  addToAnottation(product: Products): void {
    const index = this.selectedProducts.findIndex(item => item.product === product);
    if (index !== -1) {
      this.selectedProducts[index].quantity++;
    } else {
      this.selectedProducts.push({ product, quantity: 1 });
    }
    this.calculateTotal();
  }

  removeFromAnottation(product: Products): void {
    const index = this.selectedProducts.findIndex(item => item.product === product);
    if (index !== -1) {
      if (this.selectedProducts[index].quantity > 1) {
        this.selectedProducts[index].quantity--;
      } else {
        this.selectedProducts.splice(index, 1);
      }
    }
    this.calculateTotal();
  }

  getQuantity(product: Products): number {
    const item = this.selectedProducts.find(item => item.product === product);
    return item ? item.quantity : 0;
  }

  calculateTotal(): void {
    this.total = this.selectedProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}

