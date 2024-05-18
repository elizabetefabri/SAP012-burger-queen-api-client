import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './Layout/Components/cadastro/cadastro.component';
import { LoginComponent } from './Layout/Components/login/login.component';
import { MenuComponent } from './Layout/Components/menu/menu.component';
import { MesaComponent } from './Layout/Components/mesa/mesa.component';
import { ChefOrdersComponent } from './Layout/Components/chef-orders/chef-orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'mesa', component: MesaComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'chef-orders', component: ChefOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
