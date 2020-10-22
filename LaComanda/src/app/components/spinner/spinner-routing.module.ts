import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpinnerPage } from './spinner.page';

const routes: Routes = [
  {
    path: '',
    component: SpinnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpinnerPageRoutingModule {}
