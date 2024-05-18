import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent {
  @Input() totalPedido: number = 0;
  @Input() name: string = "";
}
