import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPedidoComponent } from './registrar-pedido.component';
import { MenuTabsComponent } from './menu-tabs/menu-tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { CardsPedidoComponent } from './cards-pedido/cards-pedido.component';
import { FinalizarPedidoComponent } from './finalizar-pedido/finalizar-pedido.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RegistrarPedidoComponent', () => {
  let component: RegistrarPedidoComponent;
  let fixture: ComponentFixture<RegistrarPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrarPedidoComponent,
        MenuTabsComponent,
        CardsPedidoComponent,
        FinalizarPedidoComponent
      ],
      imports: [
        HttpClientTestingModule, // Adicione o HttpClientTestingModule
        RouterTestingModule,
        MatTabsModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(RegistrarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
