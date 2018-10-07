import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe';
import { RecipesPage } from '../pages/recipes/recipes';
import { RecipePage } from '../pages/recipe/recipe';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListProvider } from '../providers/ShoppingListProvider';
import { RecipesProvider } from '../providers/recipes';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthProvider } from '../providers/auth';
import { SLOptionsPage } from '../pages/shopping-list/sl-options/sl-options';


@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    SLOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    SLOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListProvider,
    RecipesProvider,
    AuthProvider,
    SLOptionsPage
  ]
})
export class AppModule {}
