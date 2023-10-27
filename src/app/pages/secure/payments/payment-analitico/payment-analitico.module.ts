import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentAnaliticoPageRoutingModule } from './payment-analitico-routing.module';

import { PaymentAnaliticoPage } from './payment-analitico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentAnaliticoPageRoutingModule
  ],
  declarations: [PaymentAnaliticoPage]
})
export class PaymentAnaliticoPageModule {}
