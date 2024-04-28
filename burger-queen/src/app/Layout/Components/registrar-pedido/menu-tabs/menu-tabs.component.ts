
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
  @Output() totalEmit: EventEmitter<{products: { product: Products, quantity: number }[], index: number, isSum: boolean, total: number}> = new EventEmitter<{products: { product: Products, quantity: number }[], index: number, isSum: boolean, total: number}>();

  totalPedido: number = 0;

  registraTotal(event: {products: { product: Products, quantity: number }[], index: number, isSum: boolean}){
    console.log("Beverages", this.beverages);
    if (event.isSum) {
      this.totalPedido += event.products[event.index].product.price ;
    } else {
      this.totalPedido -= event.products[event.index].product.price;
    }
    this.totalEmit.emit(
      {
        products: event.products,
        index: event.index,
        isSum: event.isSum,
        total: this.totalPedido
      }
    );

  }




}
