import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditPage],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class EditPageModule {}
