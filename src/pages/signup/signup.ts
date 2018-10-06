import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    private authProvider: AuthProvider
    ) {
  }

  onSignup(form: NgForm) {
    this.authProvider.signup(form.value.email, form.value.password)
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

}
