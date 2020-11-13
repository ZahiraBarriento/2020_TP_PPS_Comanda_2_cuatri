import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [NologinGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'altas/duenio',
    loadChildren: () => import('./pages/altas/duenio/duenio.module').then( m => m.DuenioPageModule)
  },
  {
    path: 'altas/empleado',
    loadChildren: () => import('./pages/altas/empleado/empleado.module').then( m => m.EmpleadoPageModule)
  },
  {
    path: 'altas/cliente',
    loadChildren: () => import('./pages/altas/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'altas/mesa',
    loadChildren: () => import('./pages/altas/mesa/mesa.module').then( m => m.MesaPageModule)
  },
  {
    path: 'altas/producto',
    loadChildren: () => import('./pages/altas/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home/perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'encuesta/supervisor',
    loadChildren: () => import('./pages/encuestas/supervisor/supervisor.module').then( m => m.SupervisorPageModule)
  },
  {
    path: 'encuesta/empleado',
    loadChildren: () => import('./pages/encuestas/empleado/empleado.module').then( m => m.EmpleadoPageModule)
  },
  {
    path: 'encuesta/cliente',
    loadChildren: () => import('./pages/encuestas/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'aprobar-usuario',
    loadChildren: () => import('./pages/aprobar-usuario/aprobar-usuario.module').then( m => m.AprobarUsuarioPageModule)
  },  {
    path: 'administrar',
    loadChildren: () => import('./pages/administrar/administrar.module').then( m => m.AdministrarPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
