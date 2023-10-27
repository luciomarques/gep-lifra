import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentAnaliticoPage } from './payment-analitico.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentAnaliticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentAnaliticoPageRoutingModule {}
