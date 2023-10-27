import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsightsDetailPageRoutingModule } from './insights-detail-routing.module';

import { InsightsDetailPage } from './insights-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsightsDetailPageRoutingModule
  ],
  declarations: [InsightsDetailPage]
})
export class InsightsDetailPageModule {}
