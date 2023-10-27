import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as $ from 'jquery';
import { ProfileService } from 'src/app/services/profile.service';
import { GlobalService } from 'src/app/providers/global.service';
import { HttpEventType } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonIntlTelInputModel } from 'ion-intl-tel-input';

declare var window;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  edit_profile_form: FormGroup;
  submit_attempt: boolean = false;

  dadosConta: any;

  cphone: IonIntlTelInputModel = {
    dialCode: '+1',
    internationalNumber: '+1 (300) 1234567',
    isoCode: 'us',
    nationalNumber: '(300) 1234567'
  };
  formValue = { phoneNumber: this.cphone };

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private navController: NavController,
    private actionSheetController: ActionSheetController,
    private profSvc: ProfileService, public gs: GlobalService,
    private camera: Camera
  ) { }

  ngOnInit() {

    //mask tel
    // setTimeout(() => {
    //   const inp = document.querySelector('#phone');
    //   intlTelInput(inp, {
    //     utilsScript: 'path/to/js/utils.js',
    //   });
    // }, 1000);
    //mask tel

    // Setup form
    this.edit_profile_form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required]
      //phone: new FormControl({value: this.formValue.phoneNumber})
    });

    // DEBUG: Prefill inputs
    this.edit_profile_form.get('name').setValue(this.gs.dadosUser.Nome.replace(/'/gi, ''));//('John');
    this.edit_profile_form.get('email').setValue(this.gs.dadosUser.Email.replace(/'/gi, ''));//('Doe');
    this.edit_profile_form.get('password').setValue(this.gs.dadosUser.Password.replace(/'/gi, ''));

    this.profSvc.dadosContaFB().subscribe((r) => {
      this.edit_profile_form.get('phone').setValue(r.d.TELEFONE);
    });
  }

  //converter dataurl para blob
  dataUrlToFile(dataurl, filename){
    let arr = dataurl.split(','), 
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  optCamera: CameraOptions = {
    quality: 10,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  // Update profile picture
  b64toBlob(b64Data, contentType='', sliceSize=512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  async updateProfilePicture() {


    const actionSheet = await this.actionSheetController.create({
      header: 'Choose existing picture or take new',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Choose from gallery',
          icon: 'images',
          handler: () => {
            // Put in logic ...
            document.getElementById('ffoto').click();
          }
        },
        {
          text: 'Take picture',
          icon: 'camera',
          handler: () => {
            this.camera.getPicture(this.optCamera).then((imgData) => {
              //console.log(imgData);
              this.currentFile = this.b64toBlob(imgData, 'image/png');
              this.upload('foto', 'foto.png');
              //this.currentFile = 'data:image/png;base64,' + imgData;//this.dataUrlToFile('data:image/png;base64,' + imgData, 'foto.png');
              //this.upload('foto', 'foto.png');

              // fetch('data:image/png;base64,' + imgData).then((r)=>{
              //   this.currentFile = r.blob();
              //   this.upload('foto', 'foto.png');
              //   console.log('ok');
              // }).then(()=>{
              //   console.log('ok2');
              // });

              // const reader = new FileReader();
              // reader.onload = () => {
              //   const bFile = new Blob([reader.result], { type: 'image/jpeg' });
              //   this.currentFile = window.URL.createObjectURL(bFile);
              //   this.upload('foto', 'foto.png');
              // };
              // reader.readAsArrayBuffer(imgData);
            });
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }

  selectedFiles: FileList;
  currentFile: any;//File;
  progress = -1;
  token;

  fotosChegada = [];
  selectFoto(event, tipo): void {
    this.selectedFiles = event.target.files;
    this.currentFile = this.selectedFiles.item(0);
    this.upload(tipo);
  }
  fazendoUpload = false;
  upload(tipo: any, arq?): void {
    this.progress = 0;
    //this.currentFile = this.selectedFiles.item(0);

    if (this.currentFile) {
      // $('#imgProduto').prop('src',URL.createObjectURL(this.currentFile));
      //(document.getElementById('imgProduto') as HTMLImageElement).src = URL.createObjectURL(this.currentFile);
      // console.log(this.currentFile);
    }

    this.gs.showLoading = true;
    setTimeout(() => {
      this.gs.showLoading = false;
    }, 2000);
    
    this.profSvc.uploadArquivo(this.currentFile, arq).subscribe(
      event => {
        //console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          // console.log(this.progress);
        } else if (event.type === HttpEventType.Response) { // (event instanceof HttpResponse) {

          if (event.ok && (event.status === 200 || event.status === 201)) {
            this.currentFile = null;
            // console.log(event);
            if (tipo == 'foto' && event.body.arq) {
              let a = event.body.arq;//arquivo;
              this.gs.dadosUser.Foto = a;
              console.log(event.body);
              console.log(a);
              //this.fotosChegada.push(a);
            }
            this.gs.showLoading = false;
          }
        }
      },
      err => {
        console.log(err);
        //$('.textoModal').html(err.error.msg);
        //this.dangerModal.show();
        this.progress = 0;
        // this.message = 'Could not upload the file!';
        this.currentFile = null;
        this.gs.showLoading = false;
        setTimeout(() => {
          this.progress = -1;
        }, 500);
      }, () => {
        setTimeout(() => {
          this.progress = -1;
        }, 500);
        this.gs.showLoading = false;
      });
    this.selectedFiles = undefined;
  }

  sair() {
    this.navController.back();
  }

  // Submit form
  submit() {

    this.submit_attempt = true;


    let dados: any = {};

    dados.nome = $('.txt-nome').val();
    //dados.email = $('.txt-email').val();
    dados.senha = $('.txt-senha').val();
    dados.telefone = $('.txt-phone').val();
    if (dados.senha.trim() === '') {
      dados.senha = this.gs.dadosUser.Password.replace(/'/gi, '');
    }

    this.profSvc.salvarDadosConta(dados).subscribe((d) => {//this.profSvc.salvar(dados).subscribe((d) => {
      if (d?.d) {
        this.gs.dadosUser.Nome = dados.nome;
        this.gs.dadosUser.Password = dados.senha;
      }
      this.toastService.presentToast('Success', 'Profile saved', 'top', 'success', 2000);
      this.navController.back();
    });

    // If form valid
    // if (this.edit_profile_form.valid) {

    //   // Save form ...

    //   // Display success message and go back
    //   this.toastService.presentToast('Success', 'Profile saved', 'top', 'success', 2000);
    //   this.navController.back();

    // } else {

    //   // Display error message
    //   this.toastService.presentToast('Error', 'Please fill in all required fields', 'top', 'danger', 2000);
    // }
  }

}
