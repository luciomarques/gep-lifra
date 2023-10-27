import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DevicesPage implements OnInit {

  dados = [];
  integracao;
  token;

  constructor(
    private proSvc: ProfileService, private alertController: AlertController,
    private loadingController: LoadingController, private toast: ToastService
  ) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.proSvc.bancosCorretoras().subscribe((d) => {
      // console.log(d);
      this.dados = JSON.parse(d.data).FILTERS;
      console.log(this.dados);
    });
  }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  dataAtual() {
    return this.formatDate(new Date());
  }

  async showSendToken(i) {
    this.integracao = i;
    if (i == 2385 || i == 2388) {
      this.token = '';
      this.enviaToken();
    } else {
      const alert = await this.alertController.create({
        header: 'Informe o Token',
        buttons: ['ENVIAR'],
        inputs: [
          {
            placeholder: 'TOKEN',
            name: 'token',
            attributes: {
              //maxlength: 8
            }
          }
        ]
      });

      alert.onDidDismiss().then((d) => {
        console.log(d);
        this.token = d.data.token;
        this.enviaToken();
      });
      await alert.present();
    }
  }

  async enviaToken() {
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: '<p>Carregando...</p><span>Por favor , seja paciente.</span>',
      spinner: 'crescent'
    });
    await loading.present();

    this.proSvc.atualizaBanco(this.integracao, this.token).subscribe((d)=>{
      console.log(d);
      if(d.status!==200){
        let m;
        try{
          m = JSON.parse(d.error).error;
        }catch(ee){
          m=d.error;
        }
        this.toast.presentToast('Error', m, 'center', 'danger', 2000);
      }else{
        this.toast.presentToast('Sucesso', d.data, 'center', 'success', 2000);
      }
      //this.toast.presentToast('Error', 'Dados Incorrentos. tente novamente', 'top', 'danger', 2000);
    },
    (er)=>{
      console.log(er);
      loading.dismiss();
      this.toast.presentToast('Error', er.error, 'center', 'danger', 2000);
    },
    ()=>{
      loading.dismiss();
    });
  }
}
