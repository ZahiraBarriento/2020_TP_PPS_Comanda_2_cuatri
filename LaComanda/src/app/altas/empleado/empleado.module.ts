import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoPageRoutingModule } from './empleado-routing.module';

import { EmpleadoPage } from './empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoPageRoutingModule
  ],
  declarations: [EmpleadoPage]
})
export class EmpleadoPageModule {}
