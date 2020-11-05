import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientePageRoutingModule } from './cliente-routing.module';
import { ClientePage } from './cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClientePage]
})
export class ClientePageModule {}
