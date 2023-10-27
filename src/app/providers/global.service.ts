import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public dadosUser=null;
  public itemIniciado = 0;
  public showLoading = false;

  constructor() { }

  pegaDadosUser() {
    const strL = localStorage.getItem('dadosUser');
    
    if (strL !== null) {
      try {
        this.dadosUser = JSON.parse(strL);
      } catch (ex) {
        this.dadosUser = null;
      }
    } else {
    }
  }

  gravaDadosUser() {
    if (!this.dadosUser) {
      return false;
    }
    try {
      localStorage.setItem('dadosUser', JSON.stringify(this.dadosUser));
    } catch (ex) {
    }
  }

  limpaDadosUser() {
    localStorage.removeItem('dadosUser');
    this.dadosUser = null;
  }
}
