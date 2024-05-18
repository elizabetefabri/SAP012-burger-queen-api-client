import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/Shared/Services/Products/product.service';

@Component({
  selector: 'app-cards-mesa',
  templateUrl: './cards-mesa.component.html',
  styleUrls: ['./cards-mesa.component.css'],
})
export class CardsMesaComponent implements OnInit {
  @Input() mesaNumero: string = '';
  @Input() ocupada: boolean = false;
  @Output() ocupar = new EventEmitter<string>();

  constructor(private router: Router, private product: ProductService) {}

  ngOnInit(): void {}

  redirectRegistrarPedido(event: Event, mesaNumero: string): void {
    event.preventDefault();
    this.ocupar.emit(mesaNumero);
    this.router.navigate(['/menu'], {
      queryParams: { mesaId: mesaNumero },
    });
  }
}
