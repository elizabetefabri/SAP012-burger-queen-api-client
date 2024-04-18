import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsMesaComponent } from './cards-mesa.component';
import { RouterModule } from '@angular/router';

describe('CardsMesaComponent', () => {
  let component: CardsMesaComponent;
  let fixture: ComponentFixture<CardsMesaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsMesaComponent],
      imports: [
        RouterModule.forRoot([]),
      ]
    });
    fixture = TestBed.createComponent(CardsMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
