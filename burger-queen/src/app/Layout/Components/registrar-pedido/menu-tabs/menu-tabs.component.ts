import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from 'src/Models/Produto';

@Component({
  selector: 'app-menu-tabs',
  templateUrl: './menu-tabs.component.html',
  styleUrls: ['./menu-tabs.component.css']
})
export class MenuTabsComponent {
  @Input() beverages: Products[] = [];
  @Input() lunch: Products[] = [];
  @Input() breakfast: Products[] = [];
  // @Input() selectedProducts: { product: Products, quantity: number }[] = [];
  @Output() totalEmit: EventEmitter<{price: number, isSum: boolean}> = new EventEmitter<{price: number, isSum: boolean}>();

  registraTotal(event: {price: number, isSum: boolean}){
    console.log(event)
    this.totalEmit.emit(event)
  }


}
