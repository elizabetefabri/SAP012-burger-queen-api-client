import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './Layout/Components/cadastro/cadastro.component';
import { HeaderComponent } from './Layout/Components/header/header.component';
import { LoginComponent } from './Layout/Components/login/login.component';
import { CardsMesaComponent } from './Layout/Components/registrar-mesa/cards-mesa/cards-mesa.component';
import { RegistrarMesaComponent } from './Layout/Components/registrar-mesa/registrar-mesa.component';
import { CardsPedidoComponent } from './Layout/Components/registrar-pedido/cards-pedido/cards-pedido.component';
import { FinalizarPedidoComponent } from './Layout/Components/registrar-pedido/finalizar-pedido/finalizar-pedido.component';
import { MenuTabsComponent } from './Layout/Components/registrar-pedido/menu-tabs/menu-tabs.component';
import { RegistrarPedidoComponent } from './Layout/Components/registrar-pedido/registrar-pedido.component';
import { TotalPedidoComponent } from './Layout/Components/registrar-pedido/total-pedido/total-pedido.component';
import { HomeComponent } from './Layout/Pages/home/home.component';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
>>>>>>> 9e0d0601166a6000a19226946a29e2c3594525ad

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
