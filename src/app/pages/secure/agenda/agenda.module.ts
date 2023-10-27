import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaPageRoutingModule } from './agenda-routing.module';

import { AgendaPage } from './agenda.page';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaPageRoutingModule,
    CalendarModule,
  ],
  declarations: [AgendaPage],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AgendaPageModule {}
