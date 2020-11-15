import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirPlatosBebidasPage } from './pedir-platos-bebidas.page';

const routes: Routes = [
  {
    path: '',
    component: PedirPlatosBebidasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirPlatosBebidasPageRoutingModule {}
