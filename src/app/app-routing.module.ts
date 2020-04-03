import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'cliente-detalhe', loadChildren: './pages/cliente-detalhe/cliente-detalhe.module#ClienteDetalhePageModule' },
  { path: 'cliente-detalhe/:id', loadChildren: './pages/cliente-detalhe/cliente-detalhe.module#ClienteDetalhePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
