import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Layout/Pages/home/home.component';
import { LoginComponent } from './Layout/Components/login/login.component';
import { CadastroComponent } from './Layout/Components/cadastro/cadastro.component';
import { RegistrarMesaComponent } from './Layout/Components/registrar-mesa/registrar-mesa.component';
import { RegistrarPedidoComponent } from './Layout/Components/registrar-pedido/registrar-pedido.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'registrar-mesa',
    component: RegistrarMesaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registrar-pedido',
    component: RegistrarPedidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
