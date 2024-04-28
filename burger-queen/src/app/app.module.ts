import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './Layout/Components/login/login.component';
import { HomeComponent } from './Layout/Pages/home/home.component';
import { CadastroComponent } from './Layout/Components/cadastro/cadastro.component';
import { RegistrarMesaComponent } from './Layout/Components/registrar-mesa/registrar-mesa.component';
import { CardsMesaComponent } from './Layout/Components/registrar-mesa/cards-mesa/cards-mesa.component';
import { RegistrarPedidoComponent } from './Layout/Components/registrar-pedido/registrar-pedido.component';
import { CardsPedidoComponent } from './Layout/Components/registrar-pedido/cards-pedido/cards-pedido.component';
import { MenuTabsComponent } from './Layout/Components/registrar-pedido/menu-tabs/menu-tabs.component';
import { FinalizarPedidoComponent } from './Layout/Components/registrar-pedido/finalizar-pedido/finalizar-pedido.component';
import { TotalPedidoComponent } from './Layout/Components/registrar-pedido/total-pedido/total-pedido.component';
import { HeaderComponent } from './Layout/Components/header/header.component';
import { ListarProdutoComponent } from './Layout/Components/registrar-pedido/listar-produto/listar-produto.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CadastroComponent,
    RegistrarMesaComponent,
    CardsMesaComponent,
    RegistrarPedidoComponent,
    CardsPedidoComponent,
    MenuTabsComponent,
    FinalizarPedidoComponent,
    TotalPedidoComponent,
    HeaderComponent,
    ListarProdutoComponent
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
