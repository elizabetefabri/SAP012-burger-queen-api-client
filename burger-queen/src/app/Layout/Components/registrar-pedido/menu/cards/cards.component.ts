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
  @Output() totalEmmiter: EventEmitter<Item> = new EventEmitter<Item>();

  constructor() {}

  ngOnInit(): void {
    // this.items = this.items.filter((item) => item.product.tipo === this.type);
  }

  handleQuantityChange(change: Item): void {
    this.totalEmmiter.emit(change)
  }
}
