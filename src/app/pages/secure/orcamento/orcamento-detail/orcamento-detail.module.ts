import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrcamentoDetailPageRoutingModule } from './orcamento-detail-routing.module';

import { OrcamentoDetailPage } from './orcamento-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrcamentoDetailPageRoutingModule
  ],
  declarations: [OrcamentoDetailPage]
})
export class OrcamentoDetailPageModule {}
