import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../providers/global.service';

@Injectable({
  providedIn: 'root'
})
export class InvestimentosService {

  constructor(
    private http: HTTP, private gs: GlobalService
  ) {
    this.gs.pegaDadosUser();
  }

  dados(): Observable<any> {
    this.http.setDataSerializer('json');

    //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%20114[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/ivan@gllfurniture.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2020/%20NOME%20as%20DESCR,IDCONTA,[AS]R$[AS]%20as%20MOEDA_C,SIC0502G.CLASSIF_PORT%20AS%20IDTIPOINV_C,%20sic0502G.imagem%20as%20LOGO,%20%20/SUM(VAL_ATUALIZADO)%20as%20VALOR_NEGOCIACAO,AVG(PERC_MES)%20as%20PERC_MES%20/,AVG(PERC_ANO)%20as%20PERC_ANO%20,AVG(PERC_PROJECAO)%20as%20PERC_PROJECAO%20FROM%20/SIC0502,%20SIC0502G%20WHERE%20%20sic0502.idtipoinv%20=%20/sic0502G.idtipoinv%20and%20(sic0502.idconta=5004%20or%20sic0502.idconta=5005%20or/%20sic0502.idconta=5006%20or/%20IDCONTA=5007)%20AND%20IDEMPRESA%20=%20114%20GROUP%20BY%201,2,3,4,5[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    
    console.log(url);
    console.log(this.gs.dadosUser);
    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  meusInvestimentos_grafico(): Observable<any> {
    this.http.setDataSerializer('json');

    //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%2092[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2020/%20GRUPO%20as%20DESCR,[AS]R$[AS]%20as%20MOEDA_C,SIC0502G.CLASSIF_PORT%20AS%20IDTIPOINV_C,%20sic0502G.imagem%20as%20LOGO,%20%20/SUM(VAL_ATUALIZADO)%20as%20VALOR_NEGOCIACAO,AVG(PERC_MES)%20as%20PERC_MES%20/,AVG(PERC_ANO)%20as%20PERC_ANO%20,AVG(PERC_PROJECAO)%20as%20PERC_PROJECAO%20FROM%20/SIC0502,%20SIC0502G%20WHERE%20%20sic0502.idtipoinv%20=%20/sic0502G.idtipoinv%20and%20IDEMPRESA%20=%20${this.gs.dadosUser.coduser}%20GROUP%20BY%201,2,3,4[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    console.log(url);
    console.log(this.gs.dadosUser);
    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }


rentabilidade_grafico(): Observable<any> {
    this.http.setDataSerializer('json');

    //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%2092[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2020/%20GRUPO%20as%20DESCR,[AS]R$[AS]%20as%20MOEDA_C,SIC0502G.CLASSIF_PORT%20AS%20IDTIPOINV_C,%20sic0502G.imagem%20as%20LOGO,%20%20/SUM(VAL_ATUALIZADO)%20as%20VALOR_NEGOCIACAO,AVG(PERC_MES)%20as%20PERC_MES%20/,AVG(PERC_ANO)%20as%20PERC_ANO%20,AVG(PERC_PROJECAO)%20as%20PERC_PROJECAO%20FROM%20/SIC0502,%20SIC0502G%20WHERE%20%20sic0502.idtipoinv%20=%20/sic0502G.idtipoinv%20and%20IDEMPRESA%20=%20${this.gs.dadosUser.coduser}%20GROUP%20BY%201,2,3,4[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    console.log(url);
    console.log(this.gs.dadosUser);
    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }


  meusInvestimentos(): Observable<any> {
    this.http.setDataSerializer('json');

    //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%2092[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
  //  let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2020/%20NOME_PORT%20as%20DESCR,SIC0502.IDTIPOINV/,[AS]R$[AS]%20as%20MOEDA_C,SIC0502G.CLASSIF_PORT%20AS%20IDTIPOINV_C,%20sic0502G.imagem%20as%20LOGO,%20%20/SUM(VAL_ATUALIZADO)%20as%20VALOR_NEGOCIACAO,AVG(PERC_MES)%20as%20PERC_MES%20/,AVG(PERC_ANO)%20as%20PERC_ANO%20,AVG(PERC_PROJECAO)%20as%20PERC_PROJECAO%20FROM%20/SIC0502,%20SIC0502G%20WHERE%20%20sic0502.idtipoinv%20=%20/sic0502G.idtipoinv%20and%20IDEMPRESA%20=%20${this.gs.dadosUser.coduser}%20GROUP%20BY%201,2,3,4,5[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2020/%20NOME%20as%20DESCR,SIC0502.IDTIPOINV/,[AS]R$[AS]%20as%20MOEDA_C,SIC0502G.CLASSIF_PORT%20AS%20IDTIPOINV_C,%20sic0502G.imagem%20as%20LOGO,%20%20/SUM(VAL_ATUALIZADO)%20as%20VALOR_NEGOCIACAO,AVG(PERC_MES)%20as%20PERC_MES%20/,AVG(PERC_ANO)%20as%20PERC_ANO%20,AVG(PERC_PROJECAO)%20as%20PERC_PROJECAO%20FROM%20/SIC0502,%20SIC0502G%20WHERE%20%20sic0502.idtipoinv%20=%20/sic0502G.idtipoinv%20%20%20AND%20(SIC0502.IDTIPOINV=81%20OR/%20SIC0502.IDTIPOINV=77%20OR%20SIC0502.IDTIPOINV=1)%20GROUP%20BY%201,2,3,4,5[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    
  
  console.log(url);
    console.log(this.gs.dadosUser);
    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  meusInvestimentosDetalhe(o?): Observable<any> {
    this.http.setDataSerializer('json');

    //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%2092[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20first%20100%20a.descricao%20as%20DESCR,[AS]R$[AS]%20as%20MOEDA_C,/SIC0502G.CLASSIF_PORT%20AS%20IDTIPOINV_C,%20sic0502G.imagem%20as%20LOGO,%20/SUM(VAL_ATUALIZADO)%20as%20VALOR_NEGOCIACAO/%20FROM%20SIC0502,%20SIC0502G,%20SIC0502A%20a%20WHERE%20/sic0502.idinvest=a.idinvest%20and%20sic0502.idtipoinv=/sic0502G.idtipoinv%20and%20IDEMPRESA=${this.gs.dadosUser.coduser}%20AND%20SIC0502.IDTIPOINV=${o}%20GROUP%20BY%201,2,3,4/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
   console.log(url);
    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  meuscontasDetalhe(o?): Observable<any> {
    this.http.setDataSerializer('json');

    //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%2092[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
   // let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20first%2020%20data_extrato%20as%20DESCR,HISTORICO,%20VALOR,/[AS]R$[AS]%20as%20MOEDA_C,[AS].[AS]%20as%20IDTIPOINV_C%20FROM%20/SIC0501%20WHERE%20IDEMPRESA=${this.gs.dadosUser.coduser}/%20and%20Idconta=${o}[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
   //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/ivan@gllfurniture.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20first%2020%20data_extrato%20as%20DESCR,HISTORICO,%20VALOR,/[AS]R$[AS]%20as%20MOEDA_C,[AS].[AS]%20as%20IDTIPOINV_C%20FROM%20/SIC0501%20WHERE%20IDEMPRESA=114/%20and%20Idconta=${o}%20ORDER%20BY%20IDLANCTO%20DESC/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
   let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/ivan@gllfurniture.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20first%2020%20cast(DATA_EXTRATO%20as%20date)%20as%20DESCR,[AS]Operacao%20do%20dia[AS]%20AS%20HISTORICO,/[AS]R$[AS]%20as%20MOEDA_C,[AS].[AS]%20as%20IDTIPOINV_C%20,SUM(VALOR*(case%20when%20Idfluxo%20=%2001001%20then%201%20else%20-1%20end))%20AS%20VALOR%20FROM%20/SIC0501%20WHERE%20IDEMPRESA=114/%20and%20Idconta=${o}%20GROUP%20By%201,2,3,4%20ORDER%20BY%201%20DESC/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
 
  
   
    console.log(url);  
    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  analitico(o?, data?): Observable<any> {
    this.http.setDataSerializer('json');

    //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%2092[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
   // let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20first%2020%20data_extrato%20as%20DESCR,HISTORICO,%20VALOR,/[AS]R$[AS]%20as%20MOEDA_C,[AS].[AS]%20as%20IDTIPOINV_C%20FROM%20/SIC0501%20WHERE%20IDEMPRESA=${this.gs.dadosUser.coduser}/%20and%20Idconta=${o}[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
   //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/ivan@gllfurniture.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20first%2020%20data_extrato%20as%20DESCR,HISTORICO,%20VALOR,/[AS]R$[AS]%20as%20MOEDA_C,[AS].[AS]%20as%20IDTIPOINV_C%20FROM%20/SIC0501%20WHERE%20IDEMPRESA=114/%20and%20Idconta=${o}%20ORDER%20BY%20IDLANCTO%20DESC/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
   //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/ivan@gllfurniture.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20data_extrato%20as%20DESCR,HISTORICO,/[AS]R$[AS]%20as%20MOEDA_C,[AS].[AS]%20as%20IDTIPOINV_C%20,VALOR*(case%20when%20Idfluxo%20=%2001001%20then%201%20else%20-1%20end)%20AS%20VALOR%20FROM%20/SIC0501%20WHERE%20IDEMPRESA=114/%20and%20Idconta=${o}%20AND/%20DATA_EXTRATO=[AS]16.04.2023[AS]%20/ORDER%20BY%201%20DESC/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
   let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/ivan@gllfurniture.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20data_extrato%20as%20DESCR,HISTORICO,/[AS]R$[AS]%20as%20MOEDA_C,[AS].[AS]%20as%20IDTIPOINV_C%20,VALOR*(case%20when%20Idfluxo%20=%2001001%20then%201%20else%20-1%20end)%20AS%20VALOR%20FROM%20/SIC0501%20WHERE%20IDEMPRESA=114/%20and%20Idconta=${o}%20AND%20cast(DATA_EXTRATO%20as%20date)=cast(substring([AS]${data}[AS]%20from%201%20for%2010)%20as%20date)%20ORDER%20BY%201%20DESC/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
  
   
    console.log(url);  
    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  meusOrcamentoDetalhe(o?): Observable<any> {
    this.http.setDataSerializer('json');

    //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%2092[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20b.nome%20AS%20DESCR,/%20[AS]R$[AS]%20as%20MOEDA_C,%20b.nome%20AS%20IDTIPOINV_C/%20,%20b.imagem_orcamento%20as%20LOGO,%20SUM/(a.valor_quitacao)%20as%20VALOR_NEGOCIACAO/%20%20%20FROM%20SIC0501A%20a,%20SIC0805C%20b%20W/HERE%20%20a.conta%20=%20b.idc/onta%20and%20a/.idempresa%20=%20${this.gs.dadosUser.coduser}%20and%20b.tipo_info=[AS]DRE[AS]%20AND%20b.grau=3%20and%20b.conta%20/containing%20[AS]${o}[AS]%20group%20by%201,2,3,4/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
 
   console.log(url); 

    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  orcamentos(o?): Observable<any> {
    this.http.setDataSerializer('json');
    console.log(`${this.gs.dadosUser.codeuser}`); 
    //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/atasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20b.nome%20AS%20DESCR,/%20[AS]R$[AS]%20as%20MOEDA_C,%20b.nome%20AS%20IDTIPOINV_C/%20,%20b.imagem_orcamento%20as%20LOGO,%20SUM/(a.valor_quitacao)%20as%20VALOR_NEGOCIACAO/%20%20%20FROM%20SIC0501A%20a,%20SIC0805C%20b%20W/HERE%20%20a.conta%20=%20b.idc/onta%20and%20a/.idempresa%20=%2092%20and%20b.cd=[AS]C[AS]%20and%20b.tipo_info=[AS]DRE[AS]%20group%20by%201,2,3,4/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20first%2020%20sic0805C.nome%20as%20DESCR,sic0805c.CONTA,/[AS]R$[AS]%20as%20MOEDA_C,%20[AS].[AS]%20AS%20IDTIPOINV_C,/%20imagem_orcamento%20as%20LOGO,%20/0%20as%20VALOR%20%20FROM%20/sic/0805C%20WHERE%20%20cd=[AS]C[AS]%20and%20tipo_info=[AS]DRE[AS]%20AND%20GRAU=2/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20first%2020%20a.nome%20as%20DESCR,/a.CONTA,[AS]R$[AS]%20as%20MOEDA_C,%20[AS].[AS]%20AS%20IDTIPOINV_C,/%20a.imagem_orcamento%20as%20LOGO,%20coalesce((Select%20sum/%20(c.valor_quitacao)%20from%20sic0501A%20c,/sic0805C%20d%20where%20c.conta=d.idconta%20and%20c.idempresa%20=%20${this.gs.dadosUser.coduser}%20and%20d.conta%20/containing%20a.conta),0)%20%20as%20VALOR%20FROM%20sic0805C%20a%20WHERE%20a.cd=[AS]C[AS]%20/and%20a.tipo_info=%20[AS]DRE[AS]%20AND%20a.GRAU%20=%202/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    console.log('mostrando url');
    console.log(url);  
    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  orcamentos2(o?): Observable<any> {
    this.http.setDataSerializer('json');

    //let url = (`https://${o.data_ini}www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%2092[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    // let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%2092[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
   // let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20b.nome%20AS%20DESCR,/%20[AS]R$[AS]%20as%20MOEDA_C,%20b.nome%20AS%20IDTIPOINV_C/%20,%20b.imagem_orcamento%20as%20LOGO,%20SUM/(a.valor_quitacao)%20as%20VALOR_NEGOCIACAO/%20%20%20FROM%20SIC0501A%20a,%20SIC0805C%20b%20W/HERE%20%20a.conta%20=%20b.idc/onta%20and%20a/idempresa%20=%2092%20and%20b.cd=[AS]D[AS]%20and%20b./tipo_info=[AS]DRE[AS]%20group%20by%201,2,3,4/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
   // let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20first%2020%20sic0805C.nome%20as%20DESCR,sic0805c.CONTA,/[AS]R$[AS]%20as%20MOEDA_C,%20[AS].[AS]%20AS%20IDTIPOINV_C,/%20imagem_orcamento%20as%20LOGO,%20/0%20as%20VALOR%20%20FROM%20/sic/0805C%20WHERE%20%20cd=[AS]D[AS]%20and%20tipo_info=[AS]DRE[AS]%20AND%20GRAU=2/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
  let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20first%2020%20a.nome%20as%20DESCR,/a.CONTA,[AS]R$[AS]%20as%20MOEDA_C,%20[AS].[AS]%20AS%20IDTIPOINV_C,/%20a.imagem_orcamento%20as%20LOGO,%20coalesce((Select%20sum/%20(c.valor_quitacao)%20from%20sic0501A%20c,/sic0805C%20d%20where%20c.conta=d.idconta%20and%20c.idempresa%20=%20100%20and%20d.conta%20/containing%20a.conta),0)%20%20as%20VALOR%20FROM%20sic0805C%20a%20WHERE%20a.cd=[AS]D[AS]%20/and%20a.tipo_info=%20[AS]DRE[AS]%20AND%20a.GRAU%20=%202/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
  
  console.log(url); 
  return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  total(): Observable<any> {
    this.http.setDataSerializer('json');

    let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20b.nome%20AS%20DESCR,/%20[AS]R$[AS]%20as%20MOEDA_C,%20b.nome%20AS%20IDTIPOINV_C/%20,%20b.imagem_orcamento%20as%20LOGO,%20SUM/(a.valor_quitacao)%20as%20VALOR_NEGOCIACAO/%20%20%20FROM%20SIC0501A%20a,%20SIC0805C%20b%20W/HERE%20%20a.conta%20=%20b.idc/onta%20and%20a/.idempresa%20=%20${this.gs.dadosUser.codeuser}%20and%20b.cd=[AS]D[AS]%20and%20b.tipo_info=[AS]DRE[AS]%20group%20by%201,2,3,4/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);

    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  start(id): Observable<any> {
    this.http.setDataSerializer('json');

    //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%2092[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2020/%20GRUPO%20as%20DESCR,[AS]R$[AS]%20as%20MOEDA_C,SIC0502G.CLASSIF_PORT%20AS%20IDTIPOINV_C,%20sic0502G.imagem%20as%20LOGO,%20%20/SUM(VAL_ATUALIZADO)%20as%20VALOR_NEGOCIACAO,AVG(PERC_MES)%20as%20PERC_MES%20/,AVG(PERC_ANO)%20as%20PERC_ANO%20,AVG(PERC_PROJECAO)%20as%20PERC_PROJECAO%20FROM%20/SIC0502,%20SIC0502G%20WHERE%20%20sic0502.idtipoinv%20=%20/sic0502G.idtipoinv%20and%20IDEMPRESA%20=%20${this.gs.dadosUser.coduser}%20GROUP%20BY%201,2,3,4[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]/${id}`);
    url = `http://34.95.148.7:3100/start/${id}`;
    console.log(url);
    console.log(this.gs.dadosUser);
    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  stop(): Observable<any> {
    this.http.setDataSerializer('json');

    //let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/investidor.demo@nau.com/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%2092[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    let url = 'http://34.95.148.7:3100/stop';
    console.log(url);
    console.log(this.gs.dadosUser);
    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  statusRobo(): Observable<any> {
    this.http.setDataSerializer('json');

    let url = 'http://34.95.148.7:3100/status';

    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  statusRoboReal(): Observable<any> {
    this.http.setDataSerializer('json');

    let url = 'https://apinodejs.gepbusiness.com/lifra/statusRobo';

    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  buy(): Observable<any> {
    this.http.setDataSerializer('json');

    let url = 'https://apinodejs.gepbusiness.com/bingx/buy';

    return from(this.http
      .post(url, null, {})
      .then((d) => {
        console.log(d);
        return d;
      })
      .catch((ex) => {
        console.log(ex);
        return ex;
      }));
  }

  sell(): Observable<any> {
    this.http.setDataSerializer('json');

    let url = 'https://apinodejs.gepbusiness.com/bingx/buy';

    return from(this.http
      .post(url, null, {})
      .then((d) => {
        console.log(d);
        return d;
      })
      .catch((ex) => {
        console.log(ex);
        return ex;
      }));
  }

}
