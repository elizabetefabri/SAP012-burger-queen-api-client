import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModuleModule } from './Shared/app-module/app-module.module';
import { CadastroComponent } from './Layout/Components/cadastro/cadastro.component';
import { HeaderComponent } from './Layout/Components/header/header.component';
import { LoginComponent } from './Layout/Components/login/login.component';
import { MenuComponent } from './Layout/Components/menu/menu.component';
import { MesaComponent } from './Layout/Components/mesa/mesa.component';
import { BtnToggleComponent } from './Layout/Components/menu/btn-toggle/btn-toggle.component';
import { CardProductComponent } from './Layout/Components/menu/card-product/card-product.component';
import { ModalComponent } from './Layout/Components/menu/modal/modal.component';
import { TotalComponent } from './Layout/Components/menu/total/total.component';
import { ErrorDialogComponent } from './Shared/Components/error-dialog/error-dialog.component';
import { CardsMesaComponent } from './Layout/Components/mesa/cards-mesa/cards-mesa.component';
import { ChefOrdersComponent } from './Layout/Components/chef-orders/chef-orders.component';
import { AdmComponent } from './Layout/Components/panel/adm/adm.component';
import { FuncionariosComponent } from './Layout/Components/panel/funcionarios/funcionarios.component';
import { ProdutosComponent } from './Layout/Components/panel/produtos/produtos.component';
import { CategoryPipe } from './Shared/Pipes/Category/category.pipe';
import { EditUserDialogComponent } from './Layout/Components/panel/funcionarios/edit-user-dialog/edit-user-dialog.component';
import { UserService } from './Shared/Services/Users/user.service';
import { ErrorListComponent } from './Shared/Components/error-list/error-list.component';
import { AddUserDialogComponent } from './Layout/Components/panel/funcionarios/add-user-dialog/add-user-dialog.component';
import { AddProductDialogComponent } from './Layout/Components/panel/produtos/add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from './Layout/Components/panel/produtos/edit-product-dialog/edit-product-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    HeaderComponent,
    LoginComponent,
    MenuComponent,
    MesaComponent,
    BtnToggleComponent,
    CardProductComponent,
    ModalComponent,
    TotalComponent,
    ErrorDialogComponent,
    CardsMesaComponent,
    ChefOrdersComponent,
    AdmComponent,
    FuncionariosComponent,
    ProdutosComponent,
    CategoryPipe,
    EditUserDialogComponent,
    ErrorListComponent,
    AddUserDialogComponent,
    AddProductDialogComponent,
    EditProductDialogComponent
  ],
  imports: [
    AppModuleModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
