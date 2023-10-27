import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/providers/global.service';
import { InvestimentosService } from 'src/app/services/investimentos.service';
import { FilterPage } from './filter/filter.page';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentsPage implements OnInit, OnDestroy {

  content_loaded: boolean = false;

  dados = [];

  total_brasil = 0;
  total_eua = 0;

  id = '0';

  constructor(
    private routerOutlet: IonRouterOutlet, public gs: GlobalService,
    private modalController: ModalController,
    private invSvc: InvestimentosService, private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.total_eua = 0;
    this.total_brasil = 0;
    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);

    this.statusReal();

    this.pegaIdRobo();

    this.invSvc.dados().subscribe((d) => {
      //console.log(d);
      this.dados = JSON.parse(d.data).FILTERS;
      this.total_brasil = 0;
      this.dados.forEach((i) => {
        if (i.MOEDA_C === 'R$') {
          this.total_brasil += parseFloat(i.VALOR_NEGOCIACAO);
        }
        // if (i.MOEDA_C !== 'RR$') {
        //    this.total_eua += parseFloat(i.VALOR_NEGOCIACAO);
        //  }
      });
      console.log(this.dados);
    }, null, null);

  }

  ngOnDestroy(): void {
    clearInterval(this.tempo);
  }

  tempo;
  stReal = 0;
  ionViewDidEnter() {
    this.tempo = setInterval(() => {
      this.ngOnInit();
    }, 5000);
  }

  // Filter
  async filter() {

    // Open filter modal
    const modal = await this.modalController.create({
      component: FilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();

    // Apply filter from modal
    let { data } = await modal.onWillDismiss();

    if (data) {

      // Reload
      this.content_loaded = false;

      // Fake timeout
      setTimeout(() => {
        this.content_loaded = true;
      }, 2000);
    }
  }

  detalhes(item) {
    this.navCtrl.navigateForward('/payments/detail', { queryParams: { d: item } });
  }

  start(item) {
    //console.log(item);
    // this.gs.itemIniciado = item.IDCONTA;
    if (item.IDCONTA !== '5007') {
      this.invSvc.start(item.IDCONTA).subscribe((r) => {
        this.pegaIdRobo();
      });
    } else {

    }
  }

  stop(item) {
    //console.log(item);
    this.invSvc.stop().subscribe(() => {
      this.pegaIdRobo();
    });
  }

  buy(item) {
    this.gs.showLoading = true;
    this.invSvc.buy().subscribe(
      () => { },
      null,
      () => {
        setTimeout(() => {
          this.gs.showLoading = false;
        },2000);
      }
    );
  }

  sell(item) {
    this.gs.showLoading = true;
    this.invSvc.sell().subscribe(
      () => { },
      null,
      () => {
        setTimeout(() => {
          this.gs.showLoading = false;
        },2000);
      }
    );
  }

  pegaIdRobo() {
    this.invSvc.statusRobo().subscribe((r) => {
      if (r.status === 200) {
        this.id = r.data.toString();
      }
    });
  }

  statusReal() {
    this.invSvc.statusRoboReal().subscribe((r) => {
      console.log(r);
      if (r.status === 200) {
        let v = JSON.parse(r.data);
        this.stReal = v.status;
        this.gs.itemIniciado = v.idconta;
      }
    });
  }

}
