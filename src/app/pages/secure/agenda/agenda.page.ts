import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonDatetime, Platform } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AgendaPage implements OnInit {

  //@ViewChild('dt',{static:true}) dt: IonDatetime;

  dateMulti: string[]=['2022-08-11','2022-08-13','2022-08-15'];
  type: 'string';
  
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    showToggleButtons:true,
  };

  public datas = ['2022-08-14', '2022-08-15'];//,'2022-08-15'];//['2022-08-03', '2022-08-13', '2022-08-29'];

  constructor(
    private platform: Platform
  ) {
    
  }

  ngOnInit() {
  }

  onEventSelected(e){
    console.log(e);
  }

}
