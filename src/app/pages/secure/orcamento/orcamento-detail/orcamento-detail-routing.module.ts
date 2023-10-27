import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrcamentoDetailPage } from './orcamento-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OrcamentoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrcamentoDetailPageRoutingModule {}
