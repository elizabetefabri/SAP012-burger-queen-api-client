import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from 'src/Models/Produto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() beverages: Products[] = [];
  @Input() lunch: Products[] = [];
  @Input() breakfast: Products[] = [];
  @Output() totalEmit: EventEmitter<{products: { product: Products, quantity: number }[], index: number, isSum: boolean, total: number}> = new EventEmitter<{products: { product: Products, quantity: number }[], index: number, isSum: boolean, total: number}>();
  modal!: boolean;

  totalPedido: number = 0;

  registraTotal(event: {products: { product: Products, quantity: number }[], index: number, isSum: boolean}) {
    // Recalcular o total baseado na lista inteira de produtos selecionados
    this.totalPedido = event.products.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    // Emitir o evento com o total atualizado
    this.totalEmit.emit({
      products: event.products,
      index: event.index,
      isSum: event.isSum,
      total: this.totalPedido
    });
  }
}
