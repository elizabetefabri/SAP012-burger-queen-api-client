import { Component, Input } from '@angular/core';
import { Products } from 'src/Models/Produto';

@Component({
  selector: 'app-menu-tabs',
  templateUrl: './menu-tabs.component.html',
  styleUrls: ['./menu-tabs.component.css']
})
export class MenuTabsComponent {
  @Input() products: Products[] = [];
}
