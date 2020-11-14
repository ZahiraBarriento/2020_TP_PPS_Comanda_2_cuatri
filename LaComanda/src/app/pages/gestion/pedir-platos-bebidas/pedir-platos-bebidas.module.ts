import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirPlatosBebidasPageRoutingModule } from './pedir-platos-bebidas-routing.module';

import { PedirPlatosBebidasPage } from './pedir-platos-bebidas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirPlatosBebidasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PedirPlatosBebidasPage]
})
export class PedirPlatosBebidasPageModule {}
