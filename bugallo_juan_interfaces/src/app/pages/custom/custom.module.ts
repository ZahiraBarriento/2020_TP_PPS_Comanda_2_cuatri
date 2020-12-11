import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CustomPage } from './custom.page';
import { CustomPageRoutingModule } from './custom-routing.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomPageRoutingModule,
  ],
  declarations: [CustomPage]
})
export class CustomPageModule {}
