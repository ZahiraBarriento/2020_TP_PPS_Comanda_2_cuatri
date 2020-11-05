import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
