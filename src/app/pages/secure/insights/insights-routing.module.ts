import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsightsPage } from './insights.page';

const routes: Routes = [
  {
    path: '',
    component: InsightsPage
  },
  {
    path: 'insights-detail',
    loadChildren: () => import('./insights-detail/insights-detail.module').then( m => m.InsightsDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsightsPageRoutingModule {}
