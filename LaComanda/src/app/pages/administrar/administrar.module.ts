import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrarPageRoutingModule } from './administrar-routing.module';

import { AdministrarPage } from './administrar.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListaEsperaComponent } from 'src/app/components/lista-espera/lista-espera.component';
import { PedirPlatosBebidasPage } from '../gestion/pedir-platos-bebidas/pedir-platos-bebidas.page';
import { TomarPedidoPage } from '../gestion/tomar-pedido/tomar-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdministrarPage, PedirPlatosBebidasPage, TomarPedidoPage]
})
export class AdministrarPageModule {}
