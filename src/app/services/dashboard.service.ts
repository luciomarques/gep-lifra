import { Injectable } from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';
import {from, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../providers/global.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HTTP, private gs: GlobalService
  ) {
    this.gs.pegaDadosUser();
  }

  indicadores(): Observable<any>{
    this.http.setDataSerializer('json');

    let dti1, dta1;
    // try {
    //   dti1 = $filter('date')(document.getElementById('dtinicial').value, 'yyyyMMdd');
    //   dta1 = $filter('date')(document.getElementById('dtatual').value, 'yyyyMMdd');;
    // } catch (e) {
      // dti1 = ((new Date()).getFullYear() + '-' + ("0" + ((new Date()).getMonth() + 1)).slice(-2) + '-01');
      // dta1 = ((new Date()).getFullYear() + '-' + ("0" + ((new Date()).getMonth() + 1)).slice(-2) + '-' + ("0" + ((new Date()).getUTCDate() + 1)).slice(-2));
      dti1 = ((new Date()).getFullYear() + ("0" + ((new Date()).getMonth() + 1)).slice(-2) + '01');
      dta1 = ((new Date()).getFullYear() + ("0" + ((new Date()).getMonth() + 1)).slice(-2) + ("0" + ((new Date()).getUTCDate() + 1)).slice(-2));
      dti1 = ((new Date()).getFullYear() + "01"  + '01');
      dta1 = ((new Date()).getFullYear() + "12" + '31');
    //  }

    // console.log(dti1);
    // console.log(dta1)

    let url = `${environment.urlAPI}GetIndicatorsDashboard/${this.gs.dadosUser.Token}celular/${this.gs.dadosUser.UserID}/${dti1}/${dta1}/N/0`;
console.log('AAAA');
console.log(url);
    return from (this.http
      .get(url,null,{})
      .then((d)=>{
        return d;
      })
      .catch((ex)=>{
        return ex;
      }));
  }

  bancosCorretoras(): Observable<any>{
      this.http.setDataSerializer('json');
  
      let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8961`);
  
     // let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/Select%20first%20100%20a.descricao%20as%20DESCR,[AS]R$[AS]%20as%20MOEDA_C,/SIC0502G.CLASSIF_PORT%20AS%20IDTIPOINV_C,%20sic0502G.imagem%20as%20LOGO,%20/SUM(VAL_ATUALIZADO)%20as%20VALOR_NEGOCIACAO/%20FROM%20SIC0502,%20SIC0502G,%20SIC0502A%20a%20WHERE%20/sic0502.idinvest=a.idinvest%20and%20sic0502.idtipoinv=/sic0502G.idtipoinv%20and%20IDEMPRESA=${this.gs.dadosUser.coduser}%20AND%20SIC0502.IDTIPOINV=${o}%20GROUP%20BY%201,2,3,4/[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
 

      return from (this.http
        .get(url,null,{})
        .then((d)=>{
          return d;
        })
        .catch((ex)=>{
          return ex;
        }));
    
  }

  mensagens():Observable<any | null>{
    this.http.setDataSerializer('json');

    let url=(`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelularSQLSERVER/analista@nau.com/8950/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]/select%20DATA,MENSAGEM,%20TITULO,%20/IMAGEM%20from%20sic2401%20where%20idlicenca=101[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    
    return from (
      this.http.get(url, null, {})
      .then((d)=>{
        return d;
      })
      .catch((ex)=>{
        return ex;
      })
    );
  }

}
