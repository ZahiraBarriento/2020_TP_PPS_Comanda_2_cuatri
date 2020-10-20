import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuenioPage } from './duenio.page';

const routes: Routes = [
  {
    path: '',
    component: DuenioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuenioPageRoutingModule {}
