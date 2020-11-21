import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { ListaMesasComponent } from './lista-mesas/lista-mesas.component';
import { ListaEsperaComponent } from './lista-espera/lista-espera.component';
import { ChatConsultaComponent } from './chat-consulta/chat-consulta.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent, 
    ListaMesasComponent,
    ListaEsperaComponent,
    ChatConsultaComponent
  ],
  exports: [HeaderComponent, ListaEsperaComponent,ChatConsultaComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
