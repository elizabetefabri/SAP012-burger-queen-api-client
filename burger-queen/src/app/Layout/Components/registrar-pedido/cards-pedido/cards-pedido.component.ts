import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() selectedProducts: { product: Products, quantity: number }[] = [];

  @Output() totalEmmiter: EventEmitter<{products: { product: Products, quantity: number }[], index: number, isSum: boolean}> = new EventEmitter<{products: { product: Products, quantity: number }[], index: number, isSum: boolean}>();

  total: number = 0;
  price: number = 0;
  isSum: boolean = false;
  index: number = 0;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  atualizarTotal(){
    this.totalEmmiter.emit({
      products: this.selectedProducts,
      index: this.index,
      isSum: this.isSum
    });

  }

  loadProducts(){
    this.productService.listProductsByType(this.type).subscribe({
      next: (data: Products[]) => {
        // console.log(this.type, data);
        this.products = data;
      },
      error: (error) => {
        console.log('Erro ao carregar os produtos: ', error);
      }
    });
  }

  addToAnottation(product: Products): void {
    this.index = this.selectedProducts.findIndex(item => item.product === product);
    if (this.index !== -1) {
      this.selectedProducts[this.index].quantity++;
      // this.price = this.selectedProducts[this.index].product.price;
    } else {
      this.selectedProducts.push({ product, quantity: 1 });
      // this.price = product.price;
      this.index = this.selectedProducts.length -1;
    }

    this.isSum = true;

    this.calculateTotal();
  }

  removeFromAnottation(product: Products): void {
    this.index = this.selectedProducts.findIndex(item => item.product === product);
    if (this.index !== -1) {
        if (this.selectedProducts[this.index].quantity > 1) {
            this.selectedProducts[this.index].quantity--;
        } else {
            this.selectedProducts.splice(this.index, 1);
            if (this.index === this.selectedProducts.length) { // Se era o último item, ajuste o índice
                this.index -= 1;
            }
        }
        this.isSum = false;
        this.calculateTotal();
    }
}


  getQuantity(product: Products): number {
    const item = this.selectedProducts.find(item => item.product === product);
    return item ? item.quantity : 0;
  }

  calculateTotal(): void {
    this.total = this.selectedProducts.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    this.atualizarTotal();
  }
}

