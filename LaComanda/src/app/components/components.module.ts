import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { ListaMesasComponent } from './lista-mesas/lista-mesas.component';
import { ListaEsperaComponent } from './lista-espera/lista-espera.component';


@NgModule({
  declarations: [
    HeaderComponent, 
    ListaMesasComponent,
    ListaEsperaComponent
  ],
  exports: [HeaderComponent, ListaEsperaComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
