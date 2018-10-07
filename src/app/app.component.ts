import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import firebase from 'firebase';
import { AuthProvider } from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  signInPage:any = SigninPage;
  signUpPage:any = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authProvider: AuthProvider
    ) {
    firebase.initializeApp({
        apiKey: "AIzaSyDUNXQNClU35JMN-0ndkpmI8zEQguvE8Rg",
        authDomain: "recipe-book-mobile-43a62.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      // check if the user is set
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authProvider.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }
}

