import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientePageRoutingModule } from './cliente-routing.module';
import { ClientePage } from './cliente.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClientePage, HeaderComponent]
})
export class ClientePageModule {}
