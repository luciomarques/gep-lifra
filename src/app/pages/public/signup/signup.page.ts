import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  current_year: number = new Date().getFullYear();

  signup_form: FormGroup;
  submit_attempt: boolean = false;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router, private aSvc: AuthService,
    private actCtrl: ActionSheetController
  ) { }

  public actionSheetButtons = [
    {
      text: 'Yes',
      role: 'destructive',
      data: {
        action: 'salvar',
      },
      handler: ()=>{
        this.continuar();
      }
    },
    {
      text: 'No',
      data: {
        action: 'cancelar',
      },
    },
  ];

  ngOnInit() {

    // Setup form
    this.signup_form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password_repeat: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  // Sign up
  async signUp() {
    const act = this.actCtrl.create({
      header:'Confirm?',
      subHeader:`Confirm?`,
      buttons: this.actionSheetButtons,
      cssClass: 'my-custom-class',
    });
    (await act).present();
  }


  async continuar() {

    this.submit_attempt = true;

    // If email or password empty
    if (this.signup_form.value.name == '' || this.signup_form.value.email == '' || this.signup_form.value.password == '' || this.signup_form.value.password_repeat == '') {
      this.toastService.presentToast('Error', 'Please fill in all fields', 'top', 'danger', 4000);

      // If passwords do not match
    } else if (this.signup_form.value.password != this.signup_form.value.password_repeat) {
      this.toastService.presentToast('Error', 'Passwords must match', 'top', 'danger', 4000);

    } else {

      // Proceed with loading overlay
      const loading = await this.loadingController.create({
        cssClass: 'default-loading',
        message: '<p>Signing up...</p><span>Please be patient.</span>',
        spinner: 'crescent'
      });
      await loading.present();

      // TODO: Add your sign up logic
      // ...

      (this.aSvc.signUp(this.signup_form.value.email, this.signup_form.value.password, this.signup_form.value.name)).subscribe((v) => {
        console.log(v);
        this.toastService.presentToast('Welcome!', 'success!', 'top', 'success', 2000);
        this.router.navigate(['/signin']);
        loading.dismiss();
      }, (er)=>{console.log(er)}, ()=>{
        loading.dismiss();
      });

      // Success messages + routing
      // this.toastService.presentToast('Welcome!', 'Lorem ipsum', 'top', 'success', 2000);
      // await this.router.navigate(['/home']);
      // loading.dismiss();
    }

  }

}
