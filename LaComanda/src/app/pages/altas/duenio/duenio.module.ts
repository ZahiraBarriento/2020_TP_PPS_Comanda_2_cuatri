import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DuenioPageRoutingModule } from './duenio-routing.module';
import { DuenioPage } from './duenio.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DuenioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DuenioPage, HeaderComponent]
})
export class DuenioPageModule {}
