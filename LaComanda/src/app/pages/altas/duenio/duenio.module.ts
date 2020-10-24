import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuenioPageRoutingModule } from './duenio-routing.module';

import { DuenioPage } from './duenio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DuenioPageRoutingModule
  ],
  declarations: [DuenioPage]
})
export class DuenioPageModule {}
