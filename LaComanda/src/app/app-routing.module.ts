import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'altas/duenio',
    loadChildren: () => import('./components/altas/duenio/duenio.module').then( m => m.DuenioPageModule)
  },
  {
    path: 'altas/empleado',
    loadChildren: () => import('./components/altas/empleado/empleado.module').then( m => m.EmpleadoPageModule)
  },
  {
    path: 'altas/cliente',
    loadChildren: () => import('./components/altas/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'altas/mesa',
    loadChildren: () => import('./components/altas/mesa/mesa.module').then( m => m.MesaPageModule)
  },
  {
    path: 'altas/producto',
    loadChildren: () => import('./components/altas/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'spinner',
    loadChildren: () => import('./components/spinner/spinner.module').then( m => m.SpinnerPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
