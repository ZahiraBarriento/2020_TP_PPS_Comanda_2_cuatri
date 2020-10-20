import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'altas/duenio',
    loadChildren: () => import('./altas/duenio/duenio.module').then( m => m.DuenioPageModule)
  },
  {
    path: 'altas/empleado',
    loadChildren: () => import('./altas/empleado/empleado.module').then( m => m.EmpleadoPageModule)
  },
  {
    path: 'altas/cliente',
    loadChildren: () => import('./altas/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'altas/mesa',
    loadChildren: () => import('./altas/mesa/mesa.module').then( m => m.MesaPageModule)
  },
  {
    path: 'altas/producto',
    loadChildren: () => import('./altas/producto/producto.module').then( m => m.ProductoPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
