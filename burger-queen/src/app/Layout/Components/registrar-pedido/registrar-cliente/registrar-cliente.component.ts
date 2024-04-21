import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit{
  nomeCliente: string = '';
  mesaId: string = '';

  constructor(private authService: AuthService, private productService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getMesaIdFromUrl();
  }

  getMesaIdFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.mesaId = params["mesaId"] || '';
    });
  }
  salvarNomeCliente(): void {

    console.log('Nome do cliente cadastrado:', this.nomeCliente);
  }
}
