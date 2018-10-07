import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) {
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.authProvider.signin(form.value.email, form.value.password)
      .then(data => {
        console.log(data);
        loading.dismiss();
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Sigin failed',
          message: error.message,
          buttons: ['OK']
        });
        alert.present();
      })
  }

}
