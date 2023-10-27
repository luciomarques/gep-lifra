import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import { InvestimentosService } from 'src/app/services/investimentos.service';
import { FilterPage } from '../payments/filter/filter.page';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.page.html',
  styleUrls: ['./orcamento.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrcamentoPage implements OnInit {

  content_loaded: boolean = false;

  dados = [];
  dados2 =[];

  constructor(
    private invSvc: InvestimentosService, private navCtrl: NavController,
    private routerOutlet: IonRouterOutlet, private modalController: ModalController
  ) { }

  ngOnInit() {

    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);

    this.carregaDados1();
    this.carregaDados2();

  }

  ionViewDidEnter(){
    this.ngOnInit();
  }

  carregaDados1(obj?){
    this.invSvc.orcamentos(obj).subscribe((d) => {
      //console.log(d);
      this.dados = JSON.parse(d.data).FILTERS;
      console.log(this.dados);
    }, null, null);
  }

  carregaDados2(obj?){
    this.invSvc.orcamentos2(obj).subscribe((d) => {
      //console.log(d);
      this.dados2 = JSON.parse(d.data).FILTERS;
    }, null, null);
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

      console.log(data);

      // Reload
      this.content_loaded = false;

      // Fake timeout
      setTimeout(() => {
        this.content_loaded = true;
      }, 2000);
    }
  }

  detalhes(item){
    this.navCtrl.navigateForward('/orcamento/detail', {queryParams:{d: item}});
  }

}
