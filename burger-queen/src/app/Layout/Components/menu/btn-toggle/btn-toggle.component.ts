import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/Models/Order';

@Component({
  selector: 'app-btn-toggle',
  templateUrl: './btn-toggle.component.html',
  styleUrls: ['./btn-toggle.component.css']
})
export class BtnToggleComponent {
  @Input() item!: Item;
  @Output() quantityChange: EventEmitter<Item> = new EventEmitter();

  quantity: number = 0;

  constructor() {}

  increaseQuantity(): void {
    this.item.quantity++;
    this.quantityChange.emit(this.item);
  }

  decreaseQuantity(): void {
    if (this.item.quantity > 0) {
      this.item.quantity--;
      this.quantityChange.emit(this.item);
    }
  }
}

