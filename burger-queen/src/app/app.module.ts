import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Layout/Components/login/login.component';
import { HomeComponent } from './Layout/Pages/home/home.component';
import { CadastroComponent } from './Layout/Components/cadastro/cadastro.component';
import { RegistrarMesaComponent } from './Layout/Components/registrar-mesa/registrar-mesa.component';
import { CardsMesaComponent } from './Layout/Components/registrar-mesa/cards-mesa/cards-mesa.component';
import { TotalPedidoComponent } from './Layout/Components/registrar-pedido/total-pedido/total-pedido.component';
import { HeaderComponent } from './Layout/Components/header/header.component';
import { MenuComponent } from './Layout/Components/registrar-pedido/menu/menu.component';
import { CardsComponent } from './Layout/Components/registrar-pedido/menu/cards/cards.component';
import { BtnToggleComponent } from './Layout/Components/registrar-pedido/menu/btn-toggle/btn-toggle.component';
import { FinalizarPedidoComponent } from './Layout/Components/registrar-pedido/menu/finalizar-pedido/finalizar-pedido.component';
import { ModalComponent } from './Layout/Components/registrar-pedido/menu/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CadastroComponent,
    RegistrarMesaComponent,
    CardsMesaComponent,
    TotalPedidoComponent,
    HeaderComponent,
    MenuComponent,
    CardsComponent,
    BtnToggleComponent,
    FinalizarPedidoComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
