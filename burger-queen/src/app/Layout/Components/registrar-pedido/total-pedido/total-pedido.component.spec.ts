import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPedidoComponent } from './total-pedido.component';

describe('TotalPedidoComponent', () => {
  let component: TotalPedidoComponent;
  let fixture: ComponentFixture<TotalPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalPedidoComponent]
    });
    fixture = TestBed.createComponent(TotalPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
