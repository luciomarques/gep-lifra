import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsightsDetailPage } from './insights-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InsightsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsightsDetailPageRoutingModule {}
