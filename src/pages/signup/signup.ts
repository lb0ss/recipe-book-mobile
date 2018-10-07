import { Component } from '@angular/core';
import { NavController, NavParams, Loading, Alert, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) {
  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.authProvider.signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss()
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed',
          message: error.message,
          buttons:['OK']
        });
        alert.present();
      });
  }

}
