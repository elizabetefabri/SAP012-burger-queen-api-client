import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPedidoComponent } from './cards-pedido.component';

describe('CardsPedidoComponent', () => {
  let component: CardsPedidoComponent;
  let fixture: ComponentFixture<CardsPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsPedidoComponent]
    });
    fixture = TestBed.createComponent(CardsPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
