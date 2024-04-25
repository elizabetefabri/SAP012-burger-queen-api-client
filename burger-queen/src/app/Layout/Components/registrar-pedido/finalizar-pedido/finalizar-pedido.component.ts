import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';
import { Products } from 'src/Models/Produto';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.css']
})

export class FinalizarPedidoComponent implements OnInit{
  @Input() selectedProducts: { product: Products, quantity: number }[] = [];
  @Input() totalPedido: number = 0;
  @Input() mesaId: string = '';
  nomeCliente: string = '';
  nomeCadastrado: string = '';

  constructor(private authService: AuthService, private productService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getMesaIdFromUrl();
  }

  getMesaIdFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.mesaId = params["mesaId"] || '';
    });
  }

  registerNameCliente(): void {
    if (this.nomeCliente.trim() !== '') {
      this.nomeCadastrado = this.nomeCliente;
      this.nomeCliente = '';
    }
  }
}
