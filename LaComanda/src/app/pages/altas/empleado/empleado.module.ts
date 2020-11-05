import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoPageRoutingModule } from './empleado-routing.module';

import { EmpleadoPage } from './empleado.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [EmpleadoPage]
})
export class EmpleadoPageModule {}
