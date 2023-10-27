import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/providers/global.service';
import { InvestimentosService } from 'src/app/services/investimentos.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit, OnDestroy {
  public item;

  dados = [];

  total_brasil = 0;
  tbS = 0;

  id = '0';

  constructor(
    private acR: ActivatedRoute, private invSvc: InvestimentosService,
    private navCtrl: NavController, public gs: GlobalService
  ) { }

  ngOnInit() {
    this.acR.queryParams.subscribe((p) => {
      if (p.d) {
        this.item = p.d;
        console.log(this.item);

        this.statusReal();

        this.pegaIdRobo();

        this.invSvc.meuscontasDetalhe(this.item.IDCONTA).subscribe((d) => {
          this.dados = JSON.parse(d.data).FILTERS;
          this.total_brasil = 0;
          this.dados.forEach((i) => {
            this.total_brasil += parseFloat(i.VALOR);
          });
          this.tbS = this.total_brasil;
          // this.item.VALOR_NEGOCIACAO = this.total_brasil.toString();
        });

      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.tempo);
  }

  tempo;
  ionViewDidEnter() {
    this.pegaIdRobo();

    this.tempo = setInterval(() => {
      this.statusReal();
      
      this.invSvc.meuscontasDetalhe(this.item.IDCONTA).subscribe((d) => {
        this.dados = JSON.parse(d.data).FILTERS;
        this.total_brasil = 0;
        this.dados.forEach((i) => {
          this.total_brasil += parseFloat(i.VALOR);
        });
        this.tbS = this.total_brasil;
        // this.item.VALOR_NEGOCIACAO = this.total_brasil.toString();
      });
    }, 5000);
  }

  i

  analitico(item) {
    this.navCtrl.navigateForward('/payments/analitico', { queryParams: { d: this.item, dd: item.DESCR } });
  }

  start(item) {
    //console.log(item);
    //this.gs.itemIniciado = item.IDCONTA;
    this.invSvc.start(item.IDCONTA).subscribe(() => {
      this.pegaIdRobo();
    });
  }

  stop(item) {
    //console.log(item);
    this.invSvc.stop().subscribe(() => {
      this.pegaIdRobo();
    });
  }

  pegaIdRobo() {
    this.invSvc.statusRobo().subscribe((r) => {
      console.log(r);
      if (r.status === 200) {
        this.id = r.data.toString();
        console.log(this.id);
      }
    });
  }

  stReal = 0;
  statusReal(){
    this.invSvc.statusRoboReal().subscribe((r)=>{
      if(r.status===200){
        let v = JSON.parse(r.data);
        this.stReal = v.status;
        this.gs.itemIniciado = v.idconta;
      }
    });
  }

}
