import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ReactiveForms
import { ReactiveFormsModule } from '@angular/forms';

// NgCharts
import { NgChartsModule } from 'ng2-charts';
import { HTTP } from '@ionic-native/http/ngx';
import { CalendarModule } from 'ion2-calendar';

import {Camera} from '@ionic-native/camera/ngx';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({ mode: 'ios' }), 
    ReactiveFormsModule, 
    AppRoutingModule, 
    NgChartsModule,
    CalendarModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP,
    Camera
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
