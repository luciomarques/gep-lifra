import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./../../tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'styleguide',
    loadChildren: () => import('./styleguide/styleguide.module').then(m => m.StyleguidePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'settings/profile/edit',
    loadChildren: () => import('./profile/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'payments/detail',
    loadChildren: () => import('./payments/payment-detail/payment-detail.module').then( m => m.PaymentDetailPageModule)
  },
  {
    path: 'payments/analitico',
    loadChildren: () => import('./payments/payment-analitico/payment-analitico.module').then( m => m.PaymentAnaliticoPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'insights/detail',
    loadChildren: () => import('./insights/insights-detail/insights-detail.module').then( m => m.InsightsDetailPageModule)
  },
  {
    path: 'orcamento',
    loadChildren: () => import('./orcamento/orcamento.module').then( m => m.OrcamentoPageModule)
  },
  {
    path: 'orcamento/detail',
    loadChildren: () => import('./orcamento/orcamento-detail/orcamento-detail.module').then( m => m.OrcamentoDetailPageModule)
  },
  {
    path: 'mensagens',
    loadChildren: () => import('./mensagens/mensagens.module').then( m => m.MensagensPageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./agenda/agenda.module').then( m => m.AgendaPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
