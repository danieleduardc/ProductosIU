import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';

const routes: Routes = [
  {path: 'productos', component: ListaProductosComponent},
  {path: '', redirectTo: 'productos', pathMatch: 'full'},
  {path: 'registrar', component: RegistrarProductoComponent} 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
   