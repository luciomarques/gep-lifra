import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestimentosService } from 'src/app/services/investimentos.service';

@Component({
  selector: 'app-orcamento-detail',
  templateUrl: './orcamento-detail.page.html',
  styleUrls: ['./orcamento-detail.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrcamentoDetailPage implements OnInit {
  public item;

  dados=[];

  total_brasil=0;

  constructor(
    private acR: ActivatedRoute, private invSvc: InvestimentosService
  ) { }

  ngOnInit() {
    this.acR.queryParams.subscribe((p)=>{
      if (p.d){
        this.item = p.d;
        console.log(this.item);

        this.invSvc.meusOrcamentoDetalhe(this.item.CONTA).subscribe((d)=>{
          this.dados = JSON.parse(d.data).FILTERS;
          this.dados.forEach((i)=>{
            this.total_brasil += i.VALOR_NEGOCIACAO;
          });
         });
      }
    });
  }

}

