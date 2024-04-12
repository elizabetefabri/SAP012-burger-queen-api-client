import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotarPedidoComponent } from './anotar-pedido.component';

describe('AnotarPedidoComponent', () => {
  let component: AnotarPedidoComponent;
  let fixture: ComponentFixture<AnotarPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnotarPedidoComponent]
    });
    fixture = TestBed.createComponent(AnotarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
