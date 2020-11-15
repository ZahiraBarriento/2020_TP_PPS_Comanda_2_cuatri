import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomarPedidoPage } from './tomar-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: TomarPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomarPedidoPageRoutingModule {}
