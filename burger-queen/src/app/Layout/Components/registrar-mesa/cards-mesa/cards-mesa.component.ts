import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';

@Component({
  selector: 'app-cards-mesa',
  templateUrl: './cards-mesa.component.html',
  styleUrls: ['./cards-mesa.component.css'],
})
export class CardsMesaComponent implements OnInit {
  @Input() mesaNumero: string = '';

  constructor(private router: Router, private product: ProductsService) {}

  ngOnInit(): void {}

  redirectRegistrarPedido(mesaNumero: string): void {
    this.router.navigate(['/registrar-pedido'], {
      queryParams: { mesaId: mesaNumero },
    });
  }
}
