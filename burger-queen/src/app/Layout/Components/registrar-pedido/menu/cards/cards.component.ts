import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';
import { Products } from 'src/Models/Produto';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  @Input() type: string = '';
  @Input() products: Products[] = [];
  @Input() selectedProducts: { product: Products; quantity: number }[] = [];

  @Output() totalEmmiter: EventEmitter<{
    products: { product: Products; quantity: number }[];
    index: number;
    isSum: boolean;
  }> = new EventEmitter<{
    products: { product: Products; quantity: number }[];
    index: number;
    isSum: boolean;
  }>();

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  handleQuantityChange(change: { product: Products; quantity: number }): void {
    const index = this.selectedProducts.findIndex(
      (item) => item.product.id === change.product.id
    );

    if (index !== -1) {
      this.selectedProducts[index].quantity = change.quantity;

      if (change.quantity === 0) {
        this.selectedProducts.splice(index, 1);
      }
    } else if (change.quantity > 0) {
      this.selectedProducts.push(change);
    }
    this.calculateTotal();
    // this.updateTotalPedido();
  }

  loadProducts(): void {
    this.productService.listProductsByType(this.type).subscribe({
      next: (data: Products[]) => {
        this.products = data;
      },
      error: (error) => {
        console.log('Erro ao carregar os produtos: ', error);
      },
    });
  }

  calculateTotal(): void {
    this.totalEmmiter.emit({
      products: this.selectedProducts,
      index: this.selectedProducts.length - 1,
      isSum: true,
    });
  }
}
