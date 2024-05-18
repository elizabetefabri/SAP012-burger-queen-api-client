import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/Authentication/auth.service';
import { OrderService } from 'src/app/Shared/Services/Orders/order.service';
import { ProductService } from 'src/app/Shared/Services/Products/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  mesaId: string = '';
  totalPedido: number = 0;
  isModalOpen: boolean = false;
  itemCount: number = 0;

  constructor(
    private auth: AuthService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getMesaIdFromUrl();
    this.productService.itemCount$.subscribe(count => {
      this.itemCount = count;
    });
    this.orderService.modalState.subscribe(isOpen => {
      this.isModalOpen = isOpen;
    });
  }

  getMesaIdFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.mesaId = params["mesaId"] || '';
    });
  }

  openModal() {
    this.orderService.openModal();
  }

  closeModal() {
    this.orderService.closeModal();
  }

  deslogar() {
    this.auth.logout();
  }

}
