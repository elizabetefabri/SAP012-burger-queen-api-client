import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';
import { Products } from 'src/Models/Produto';

@Component({
  selector: 'app-cards-pedido',
  templateUrl: './cards-pedido.component.html',
  styleUrls: ['./cards-pedido.component.css']
})
export class CardsPedidoComponent implements OnInit{
  @Input() type: string = '';
  products: Products[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // get filteredProducts(): Products[] {
  //   return this.products.filter(product => product.tipo === this.type);
  // }

  loadProducts(){
    this.productService.listProductsByType(this.type).subscribe({
      next: (data: Products[]) => {
        console.log(this.type, data);
        this.products = data;
      },
      error: (error) => {
        console.log('Erro ao carregar os produtos: ', error);
      }
    });
  }
}

