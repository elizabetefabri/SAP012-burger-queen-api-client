import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from 'src/Models/Produto';

@Component({
  selector: 'app-menu-tabs',
  templateUrl: './menu-tabs.component.html',
  styleUrls: ['./menu-tabs.component.css']
})
export class MenuTabsComponent {
// @Input() selectedProducts: { product: Products, quantity: number }[] = [];
  @Input() beverages: Products[] = [];
  @Input() lunch: Products[] = [];
  @Input() breakfast: Products[] = [];
  @Output() totalEmit: EventEmitter<{price: number, isSum: boolean}> = new EventEmitter<{price: number, isSum: boolean}>();

  totalPedido: number = 0;

  registraTotal(event: {price: number, isSum: boolean}){
    console.log(event);
    if (event.isSum) {
      this.totalPedido += event.price;
    } else {
      this.totalPedido -= event.price;
    }
    this.totalEmit.emit({price: this.totalPedido, isSum: event.isSum}); // Emit totalPedido for display
  }
}
