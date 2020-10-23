import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesaPageRoutingModule } from './mesa-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MesaPage } from './mesa.page';
import { QrComponent } from 'src/app/components/qr/qr.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MesaPage,
  QrComponent]
})
export class MesaPageModule {}
