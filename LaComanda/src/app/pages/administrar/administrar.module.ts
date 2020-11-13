import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrarPageRoutingModule } from './administrar-routing.module';

import { AdministrarPage } from './administrar.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListaEsperaComponent } from 'src/app/components/lista-espera/lista-espera.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdministrarPage]
})
export class AdministrarPageModule {}
