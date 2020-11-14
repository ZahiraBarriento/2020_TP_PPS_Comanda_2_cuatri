import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonicModule } from '@ionic/angular';

import { AprobarUsuarioPageRoutingModule } from './aprobar-usuario-routing.module';

import { AprobarUsuarioPage } from './aprobar-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprobarUsuarioPageRoutingModule
  ],
  declarations: [AprobarUsuarioPage, HeaderComponent]
})
export class AprobarUsuarioPageModule {}
