import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';
import { Item, Order } from 'src/Models/Order';
import { Product } from 'src/Models/Produto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  @Input() type: string = '';
  @Input() product: Product[] = [];
  beverages: Item[] = [];
  lunch: Item[] = [];
  breakfast: Item[] = [];
  combos: Item[] = [];
  sides: Item[] = [];

  order: Order = {
    id: 0,
    client: "",
    items: [],
    userId: 0
  }

  @Output() totalEmit: EventEmitter<{ product: { product: Product, quantity: number }[], index: number, isSum: boolean, total: number }> = new EventEmitter<{ product: { product: Product, quantity: number }[], index: number, isSum: boolean, total: number }>();
  modal!: boolean;

  totalPedido: number = 0;

  constructor(
    private productService: ProductsService,
    private route: Router,
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
            quantity: 0
          })
        });
        this.classificarProduto();
      },
      error: (error) => {
        console.log('Erro ao carregar os produtos: ', error);
      },
    });
  }

  registraTotal(item: Item) {
    if(!this.order.items.includes(item)){
      this.order.items.push(item);
    } else {
      const index = this.order.items.indexOf(item);
      if(item.quantity > 0){
        this.order.items[index] = item;
      } else {
        this.order.items.splice(index, 1);
      }
    }

    this.totalPedido = this.order.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  classificarProduto(): void {
   this.beverages = this.order.items.filter((item: Item) => {
    return item.product.tipo === "Beverages"
   })
   this.lunch = this.order.items.filter((item: Item) => {
    return item.product.tipo === "Lunch"
   })
   this.breakfast = this.order.items.filter((item: Item) => {
    return item.product.tipo === "Breakfast"
   })
   this.combos = this.order.items.filter((item: Item) => {
    return item.product.tipo === "Combos"
   })
   this.sides = this.order.items.filter((item: Item) => {
    return item.product.tipo === "Sides"
   })
   this.order.items = [];
  }
}
