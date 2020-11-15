import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomarPedidoPageRoutingModule } from './tomar-pedido-routing.module';

import { TomarPedidoPage } from './tomar-pedido.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomarPedidoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TomarPedidoPage]
})
export class TomarPedidoPageModule {}
