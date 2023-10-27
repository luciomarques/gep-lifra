import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/global.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  current_year: number = new Date().getFullYear();

  signin_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router, private gs: GlobalService
  ) { }

  ngOnInit() {

    // Setup form
    this.signin_form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    // DEBUG: Prefill inputs
    // this.signin_form.get('email').setValue('pernambuco.luiz101@gmail.com123');
    //this.signin_form.get('password').setValue('00000');
    this.signin_form.get('email').setValue('');
    this.signin_form.get('password').setValue('');
  }

  // Sign in
  async signIn() {

    this.submit_attempt = true;

    // If email or password empty
    if (this.signin_form.value.email == '' || this.signin_form.value.password == '') {
      this.toastService.presentToast('Error', 'Dados Incorrentos. tente novamente', 'top', 'danger', 2000);

    } else {

      // Proceed with loading overlay
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: '<p>Logando...</p><span>Por favor , seja paciente.</span>',
        spinner: 'crescent'
      });
      await loading.present();

      // TODO: Add your sign in logic
      // ...

      this.authService.signIn(this.signin_form.value.email, this.signin_form.value.password)
        .subscribe((v) => {
          console.log(v);
          // console.log(JSON.parse(v.data));
          if (v) {
            let obj = JSON.parse(v.data);
            // console.log(obj);
            if (obj.Status === 'fail') {
              this.toastService.presentToast('Error', obj.ErrorMessage, 'top', 'danger', 2000);
            } else {
              this.gs.dadosUser = obj;
              this.gs.gravaDadosUser();
              this.router.navigate(['/home']);
            }
          }
        }, (ex) => {
          // console.log(ex);
        }, () => {
          loading.dismiss();
        });

      // Fake timeout
      // setTimeout(async () => {

      //   // Sign in success
      //   //await this.router.navigate(['/home']);
      //   loading.dismiss();
      // }, 2000);

    }
  }

}
