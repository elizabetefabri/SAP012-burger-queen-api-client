import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, Order } from 'src/app/Models/Order';
import { Product } from 'src/app/Models/Produto';
import { OrderService } from 'src/app/Shared/Services/Orders/order.service';
import { ProductService } from 'src/app/Shared/Services/Products/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input() type: string = '';
  @Input() product: Product[] = [];
  beverages: Item[] = [];
  lunch: Item[] = [];
  breakfast: Item[] = [];
  combos: Item[] = [];
  sides: Item[] = [];

  order: Order = {
    id: 0,
    client: '',
    items: [],
    userId: 0,
    status: '',
    dateEntry: '',
    dateProcessed: '',
    mesaId: '',
    clientId: '',
    preparationTime: '',
  };

  @Output() totalEmit: EventEmitter<{
    product: { product: Product; quantity: number }[];
    index: number;
    isSum: boolean;
    total: number;
  }> = new EventEmitter<{
    product: { product: Product; quantity: number }[];
    index: number;
    isSum: boolean;
    total: number;
  }>();

  modal: boolean = false;
  totalPedido: number = 0;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.order.id = this.activatedRoute.snapshot.queryParams['mesaId'];
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.listProducts().subscribe({
      next: (data: Product[]) => {
        data.forEach((produto: Product) => {
          this.order.items.push({
            product: produto,
            quantity: 0,
          });
        });
        this.classificarProduto();
      },
      error: (error) => {
        console.log('Erro ao carregar os produtos: ', error);
      },
    });
  }

  registraTotal(item: Item): void {
    const index = this.order.items.findIndex(
      (i) => i.product.id === item.product.id
    );
    if (index !== -1) {
      this.order.items[index] = item;
    } else {
      this.order.items.push(item);
    }
    this.totalPedido = this.order.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const totalQuantity = this.order.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.productService.updateItemCount(totalQuantity);

    this.orderService.addItem(item);
  }

  classificarProduto(): void {
    this.beverages = this.order.items.filter(
      (item) => item.product.tipo === 'Beverages'
    );
    this.lunch = this.order.items.filter(
      (item) => item.product.tipo === 'Lunch'
    );
    this.breakfast = this.order.items.filter(
      (item) => item.product.tipo === 'Breakfast'
    );
    this.combos = this.order.items.filter(
      (item) => item.product.tipo === 'Combos'
    );
    this.sides = this.order.items.filter(
      (item) => item.product.tipo === 'Sides'
    );
    this.order.items = [];
  }

  openModal(): void {
    this.modal = true;
  }

  closeModal(): void {
    this.modal = false;
  }
}
