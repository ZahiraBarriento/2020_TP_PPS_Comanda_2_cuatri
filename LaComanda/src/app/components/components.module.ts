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
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';


@NgModule({
  declarations: [
    HeaderComponent, 
    ListaMesasComponent,
    ListaEsperaComponent,
    ChatConsultaComponent,
    ListaJuegosComponent
  ],
  exports: [HeaderComponent, ListaEsperaComponent,ChatConsultaComponent, ListaJuegosComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
