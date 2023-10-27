import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrcamentoPage } from './orcamento.page';

const routes: Routes = [
  {
    path: '',
    component: OrcamentoPage
  },
  {
    path: 'orcamento-detail',
    loadChildren: () => import('./orcamento-detail/orcamento-detail.module').then( m => m.OrcamentoDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrcamentoPageRoutingModule {}
