import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/Models/Order';

@Component({
  selector: 'app-btn-toggle',
  templateUrl: './btn-toggle.component.html',
  styleUrls: ['./btn-toggle.component.css']
})
export class BtnToggleComponent {
  @Input() item!: Item;
  // @Input() index: number = 0;
  @Input() index!: number;
  // @Input() index?: number;
  @Output() quantityChange: EventEmitter<Item> = new EventEmitter();

  quantity: number = 0;

  constructor() {}

  increaseQuantity(): void {
    this.item.quantity++;
    this.quantityChange.emit(this.item);
  }

  decreaseQuantity(): void {
    if (this.quantity > 0) {
      this.item.quantity--;
      this.quantityChange.emit(this.item);
    }
  }
}
