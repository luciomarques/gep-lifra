import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { InvestimentosService } from 'src/app/services/investimentos.service';

@Component({
  selector: 'app-payment-analitico',
  templateUrl: './payment-analitico.page.html',
  styleUrls: ['./payment-analitico.page.scss'],
})
export class PaymentAnaliticoPage implements OnInit, OnDestroy {

  public item;

  public data;

  dados = [];

  valor = 0;

  total_brasil = 0;

  id = '0';

  constructor(
    private acR: ActivatedRoute, private invSvc: InvestimentosService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.acR.queryParams.subscribe((p) => {
      if (p.d) {
        this.item = p.d;
        console.log(this.item);

        this.data = p.dd.split('/');
        this.data = `${this.data[0]}.${this.data[1]}.${this.data[2]}`;
        console.log(this.data);

        this.pegaIdRobo();

        this.invSvc.analitico(this.item.IDCONTA, this.data).subscribe((d) => {
          console.log(d.data);
          this.dados = JSON.parse(d.data).FILTERS;
          console.log(this.dados);
          this.valor = 0;
          this.dados.forEach((i) => {
            try {
              this.total_brasil += parseFloat(i.VALOR);
              this.valor += parseFloat(i.VALOR);
            } catch (ex) { }
          });
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

    // this.tempo = setInterval(() => {
    //   this.invSvc.analitico(this.item.IDCONTA, this.data).subscribe((d) => {
    //     console.log(d);
    //     this.dados = JSON.parse(d.data).FILTERS;
    //     this.valor = 0;
    //     this.total_brasil = 0;
    //     this.dados.forEach((i) => {
    //       this.total_brasil += parseFloat(i.VALOR);
    //       this.valor += parseFloat(i.VALOR);
    //     });
    //   });
    // }, 5000);

  }

  start(item) {
    //console.log(item);
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

}
