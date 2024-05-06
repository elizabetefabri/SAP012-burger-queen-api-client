import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Item } from 'src/Models/Order';
import { Product } from 'src/Models/Produto';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  @Input() items: Item[] = [];
  // changedItem?: Item;
  // @Input() selectedProducts: { product: Product; quantity: number }[] = [];

  @Output() totalEmmiter: EventEmitter<Item> = new EventEmitter<Item>();

  constructor() {}

  ngOnInit(): void {
    // this.items = this.items.filter((item) => item.product.tipo === this.type);

  }

  // handleQuantityChange(change: { product: Product; quantity: number }): void {
  //   const index = this.selectedProducts.findIndex(
  //     (item) => item.product.id === change.product.id
  //   );

  //   if (index !== -1) {
  //     this.selectedProducts[index].quantity = change.quantity;

  //     if (change.quantity === 0) {
  //       this.selectedProducts.splice(index, 1);
  //     }
  //   } else if (change.quantity > 0) {
  //     this.selectedProducts.push(change);
  //   }
  //   // this.classificarProduto();
  // }
  handleQuantityChange(change: Item): void {
    this.totalEmmiter.emit(change)
    // console.log(change)
  }

}
