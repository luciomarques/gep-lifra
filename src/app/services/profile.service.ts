import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../providers/global.service';
import { HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HTTP, private gs: GlobalService, private httpc: HttpClient
  ) {
    this.gs.pegaDadosUser();
  }

  //Dados conta Profile
  dadosContaFB(): Observable<any> {
    const h = {
      //'Content-Type':'application/json;charset:utf-8'
      'e-usuario': this.gs.dadosUser.UserID,
      'e-projeto': 'lifra'
    };
    this.http.setDataSerializer('json');

    let url = encodeURI(`https://apinodejs.gepbusiness.com/web/dadosContaFB`);
    //console.log(url);

    return from(
      this.http.get(url, {}, h)
        .then((d) => {
          // console.log(d);
          if (d.status === 200) {
            return JSON.parse(d.data);
          }
          return d;
        })
        .catch((ex) => {
          console.log(ex);
          return ex;
        })
    );
  }

  salvarDadosConta(d: any): Observable<any> {
    const h = {
      //'Content-Type':'application/json;charset:utf-8'
      'e-usuario': this.gs.dadosUser.UserID,
      'e-projeto': 'lifra'
    };
    this.http.setDataSerializer('json');

    let url = encodeURI(`https://apinodejs.gepbusiness.com/web/updateProfile`);
    //console.log(url);

    return from(
      this.http.put(url, d, h)
        .then((d) => {
          // console.log(d);
          if (d.status === 200) {
            return JSON.parse(d.data);
          }
          return d;
        })
        .catch((ex) => {
          console.log(ex);
          return ex;
        })
    );
  }

  uploadArquivo(file: File, arq?: string): Observable<any> {
    const h = {
      //'Content-Type':'application/json;charset:utf-8'
      'e-usuario': this.gs.dadosUser.UserID,
      'e-projeto': 'lifra'
    };

    const hd = new HttpHeaders({ 'e-usuario': this.gs.dadosUser.UserID });
    //this.http.setDataSerializer('json');
    // console.log(file);
    const retorno: any = {};

    const formData: FormData = new FormData();
    formData.append('e-usuario', this.gs.dadosUser.UserID);
    if (!arq) {
      formData.append('foto', file);
    } else {
      formData.append('foto', file, arq);
    }
    const req = new HttpRequest('POST', 'https://apinodejs.gepbusiness.com/web/uploadFoto', formData, { headers: hd, reportProgress: true });
    return this.httpc.request(req);
  }

  salvar(dados?): Observable<any> {
    this.http.setDataSerializer('json');

    let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%20${this.gs.dadosUser.codeuser}[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    // let url = (`https://www.g${dados.nome}epbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8997/[[C][@]FilterName[@]:[@]idsql[@],[@]FilterValue[@]:[@]0[@],[@]FilterCaption[@]:[@]Codigo[@][C1],[C][@]FilterName[@]:[@]SelectManual[@],[@]FilterValue[@]:[@]Select%20first%2010%20/IDCONTA,NOME,VAL_ATUALIZADO%20/FROM%20SIC0502%20WHERE%20IDEMPRESA/%20=%20${this.gs.dadosUser.codeuser}[@],[@]FilterCaption[@]:[@]Select[@][C1]/,[C][@]FilterName[@]:[@]DataFinal[@],[@]FilterValue[@]:[@]20/200101[@],[@]FilterCaption[@]:[@]DataInicial[@][C1],[C][@]FilterName[@]:[@]DataInici/al[@],[@]FilterValue[@]:[@]20200101[@],[@]Filter/Caption[@]:[@]Datafinal[@][C1]]`);
    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }

  bancosCorretoras(): Observable<any> {
    this.http.setDataSerializer('json');

    let url = (`https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GetDataGenericReports/'0000APIcelular/${this.gs.dadosUser.UserID}/8961`);

    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));

  }

  atualizaBanco(integracao, token?): Observable<any>{
    this.http.setDataSerializer('json');

    let url = (`https://www.gepbusiness.com//GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/GeraaExtratoBanco/${this.gs.dadosUser.UserID}/${integracao}/${token}`);

    return from(this.http
      .get(url, null, {})
      .then((d) => {
        return d;
      })
      .catch((ex) => {
        return ex;
      }));
  }
}
