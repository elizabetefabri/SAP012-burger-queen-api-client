import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTabsComponent } from './menu-tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CardsPedidoComponent } from '../cards-pedido/cards-pedido.component';
import { FinalizarPedidoComponent } from '../finalizar-pedido/finalizar-pedido.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MenuTabsComponent', () => {
  let component: MenuTabsComponent;
  let fixture: ComponentFixture<MenuTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuTabsComponent,
        CardsPedidoComponent,
        FinalizarPedidoComponent
      ],
      imports: [
        MatTabsModule,
        NoopAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(MenuTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
