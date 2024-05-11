import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/Shared/Services/Orders/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mesaId: string = '';
  totalPedido: number = 0;

  constructor(
    private auth: AuthService,
    private orderService: OrdersService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getMesaIdFromUrl();
  }

  getMesaIdFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      this.mesaId = params["mesaId"] || '';
    });
  }

  closeModal(){}
  openModal() {
    // this.orderSh.$modal.emit(true)
    this.orderService.openModal();
  }

  deslogar(){
    this.auth.logout()
  }
}
