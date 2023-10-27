import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        // loadChildren: () => import('../pages/secure/home/home.module').then(m => m.HomePageModule)
        loadChildren: () => import('../pages/secure/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'insights',
        loadChildren: () => import('../pages/secure/insights/insights.module').then(m => m.InsightsPageModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('../pages/secure/payments/payments.module').then(m => m.PaymentsPageModule)
      },
      {
        path: 'orcamento',
        loadChildren: () => import('../pages/secure/orcamento/orcamento.module').then(m => m.OrcamentoPageModule)
      },
      {
        path: 'cards',
        loadChildren: () => import('../pages/secure/cards/cards.module').then(m => m.CardsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }