import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../../../Models/Order';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {
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
