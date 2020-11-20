import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirCuentaPageRoutingModule } from './pedir-cuenta-routing.module';

import { PedirCuentaPage } from './pedir-cuenta.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirCuentaPageRoutingModule
  ],
  declarations: [PedirCuentaPage, HeaderComponent]
})
export class PedirCuentaPageModule {}
