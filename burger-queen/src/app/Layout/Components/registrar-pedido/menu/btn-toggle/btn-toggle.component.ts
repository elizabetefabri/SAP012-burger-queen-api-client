import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from 'src/Models/Produto';

@Component({
  selector: 'app-btn-toggle',
  templateUrl: './btn-toggle.component.html',
  styleUrls: ['./btn-toggle.component.css']
})
export class BtnToggleComponent {
  @Input() product!: Products;
  @Output() quantityChange: EventEmitter<{ product: Products, quantity: number }> = new EventEmitter();

  quantity: number = 0;

  constructor() {}

  increaseQuantity(): void {
    this.quantity++;
    this.quantityChange.emit({ product: this.product, quantity: this.quantity });
  }

  decreaseQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
      this.quantityChange.emit({ product: this.product, quantity: this.quantity });
    }
  }
}
