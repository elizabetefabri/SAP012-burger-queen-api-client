import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMesaComponent } from './registrar-mesa.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsMesaComponent } from './cards-mesa/cards-mesa.component';
import { RouterModule } from '@angular/router';


describe('RegistrarMesaComponent', () => {
  let component: RegistrarMesaComponent;
  let fixture: ComponentFixture<RegistrarMesaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrarMesaComponent,
        CardsMesaComponent
      ],
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule
      ]
    });
    fixture = TestBed.createComponent(RegistrarMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
