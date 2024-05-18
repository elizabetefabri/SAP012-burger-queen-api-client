import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, Order } from 'src/app/Models/Order';
import { Product } from 'src/app/Models/Produto';
import { AuthService } from 'src/app/Shared/Services/Authentication/auth.service';
import { OrderService } from 'src/app/Shared/Services/Orders/order.service';
import { ProductService } from 'src/app/Shared/Services/Products/product.service';
import { v4 as uuidv4 } from "uuid";
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() mesaId: string = '';
  totalPedido: number = 0;
  @Output() quantityChange: EventEmitter<Item> = new EventEmitter();
  @Output() totalEmmiter: EventEmitter<{
    product: { product: Product; quantity: number }[];
    index: number;
    isSum: boolean;
    total: number;
  }> = new EventEmitter<{
    product: { product: Product; quantity: number }[];
    index: number;
    isSum: boolean;
    total: number;
  }>();

  nomeCliente: string = '';
  nomeCadastrado: string = '';
  items: Item[] = [];

  constructor(
    private auth: AuthService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auth.getCurrentUser();
    this.getMesaIdFromUrl();
    this.orderService.items$.subscribe((items) => {
      this.items = items;
      this.calculateTotal(); // Calcular o total sempre que os itens forem atualizados
    });
  }

  getMesaIdFromUrl(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.mesaId = params['mesaId'] || '';
    });
  }

  registerNameCliente(): void {
    if (this.nomeCliente.trim() !== '') {
      this.nomeCadastrado = this.nomeCliente;
    }
    this.nomeCliente = '';
  }

  handleQuantityChange(change: Item): void {
    const total = this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const eventPayload = {
      product: this.items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      index: this.items.findIndex(
        (item) => item.product.id === change.product.id
      ),
      isSum: true, // ou false, conforme a lógica que você deseja
      total: total,
    };
    this.totalEmmiter.emit(eventPayload);
    this.calculateTotal();
  }

  removeItem(item: Item): void {
    this.orderService.removeItem(item);
    this.calculateTotal();
  }

  openModal(): void {
    this.orderService.openModal();
  }

  closeModal(): void {
    this.orderService.closeModal();
  }

  calculateTotal(): void {
    this.totalPedido = this.items.reduce(
      (total, item) => total + (item.product.price * item.quantity), 0);
  }

  enviarPedido(): void {
    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) {
      console.error('Usuário não autenticado');
      this.router.navigate(['/login']); // Redireciona para a página de login
      return;
    }
    const userId = currentUser.id; // Obtém o ID do usuário logado
    const dateEntry = new Date().toISOString();
    const clientId = uuidv4(); // Gera um ID único para o cliente

    const order: Partial<Order> = {
      userId: Number(userId),
      clientId: clientId, // Adiciona o clientId ao pedido
      client: this.nomeCadastrado,
      items: this.items.map(item => ({
        product: item.product,
        quantity: item.quantity
      })),
      status: "pending",
      dateEntry: dateEntry,
      mesaId: this.mesaId // Adiciona o número da mesa
    };

    this.orderService.postOrder(order as Order).subscribe(response => {
      console.log('Order created successfully', response);
      this.clearOrder();
      this.closeModal(); // Fecha o modal automaticamente
      this.router.navigate(['/chef-orders']); // Redireciona para a página de pedidos do chefe
    }, error => {
      console.error('Error creating order', error);
    });
  }

  clearOrder(): void {
    this.orderService.clearItems();
    this.nomeCadastrado = '';
    this.totalPedido = 0;
  }
}
