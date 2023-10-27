import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestimentosService } from 'src/app/services/investimentos.service';

@Component({
  selector: 'app-insights-detail',
  templateUrl: './insights-detail.page.html',
  styleUrls: ['./insights-detail.page.scss'],
})
export class InsightsDetailPage implements OnInit {
  public item;

  dados = [];

  total_brasil=0;

  constructor(
    private acR: ActivatedRoute, private invSvc: InvestimentosService
  ) { }

  ngOnInit() {
    this.acR.queryParams.subscribe((p) => {
      if (p.d) {
        this.item = p.d;
        console.log('aqui');
        console.log(this.item);

        this.invSvc.meusInvestimentosDetalhe(this.item.IDTIPOINV).subscribe((d) => {
          this.dados = JSON.parse(d.data).FILTERS;

          this.dados.forEach((i)=>{
            this.total_brasil += i.VALOR_NEGOCIACAO;
          });
        });

      }
    });
  }

}
