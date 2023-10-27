import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Subscriber } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MensagensPage implements OnInit {

  mensagens = [];
  constructor(
    private ds: DashboardService, private platform: Platform,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.ds.mensagens().subscribe((r)=>{
        if(r.status===200){
          this.mensagens = JSON.parse(r.data).FILTERS;
          console.log(this.mensagens);
        }
      });
    });
  }

  voltar(){
    this.navCtrl.back();
  }

}
