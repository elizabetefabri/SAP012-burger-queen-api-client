import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Products } from 'src/Models/Produto';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.css']
})
export class ListarProdutoComponent implements OnChanges {
  @Input() selectedProducts: { product: Products, quantity: number }[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedProducts'] && !changes['selectedProducts'].firstChange) {
      console.log("Produtos antigos: ", changes['selectedProducts'].previousValue);
      console.log("Produtos novos: ", changes['selectedProducts'].currentValue);
    }
  }
}
