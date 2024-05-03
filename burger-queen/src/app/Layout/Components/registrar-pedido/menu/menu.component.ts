import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';
import { Order } from 'src/Models/Order';
import { Product } from 'src/Models/Produto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() type: string = '';
  @Input() product: Product[] = [];
  // @Input() beverages: Product[] = [];
  // @Input() lunch: Product[] = [];
  // @Input() breakfast: Product[] = [];
  order: Order = {} as Order;
  @Output() totalEmit: EventEmitter<{product: { product: Product, quantity: number }[], index: number, isSum: boolean, total: number}> = new EventEmitter<{product: { product: Product, quantity: number }[], index: number, isSum: boolean, total: number}>();
  modal!: boolean;

  totalPedido: number = 0;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.order.id = this.activatedRoute.snapshot.params['mesaId'];
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.listProductsByType(this.type).subscribe({
      next: (data: Product[]) => {
        this.order.items = data.map(
          (product: Product) => {
            return {
              product,
              quantity: 0
            }
          }
        );
        // this.products = data;
      },
      error: (error) => {
        console.log('Erro ao carregar os produtos: ', error);
      },
    });
  }

  registraTotal(event: {product: { product: Product, quantity: number }[], index: number, isSum: boolean}) {

    this.totalPedido = event.product.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    // Emitir o evento com o total atualizado
    this.totalEmit.emit({
      product: event.product,
      index: event.index,
      isSum: event.isSum,
      total: this.totalPedido
    });
  }
}
