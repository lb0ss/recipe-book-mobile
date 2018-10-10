import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipesProvider } from '../../providers/recipes';
import { RecipePage } from '../recipe/recipe';
import { DatabaseOptionsPage } from '../database-options/database-options';
import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private recipesProvider: RecipesProvider,
    private popOverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authProvider: AuthProvider
    ) {
  }

  ionViewWillEnter() {
    this.recipes = this.recipesProvider.getRecipe();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {
      mode: 'New'
    });
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {
      recipe: recipe, 
      index: index
    });
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait'
    });
    const popover = this.popOverCtrl.create(DatabaseOptionsPage);
    // allows the popover to know the location to present itself
    // 'ev' is a reserved property for NavOptions
    popover.present({ev: event}); 
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        if (data.action == 'load') {
          loading.present();
          this.authProvider.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.recipesProvider.fetchList(token)
                .subscribe(
                  (list: Recipe[]) => {
                    loading.dismiss();
                    if (list) {
                      this.recipes = list;
                    } else {
                      this.recipes = [];
                    }
                  },
                  error => {
                    loading.dismiss();
                    console.log(error);
                    this.handleError(error.message);
                  }
                )
            }
          );
        } else if (data.action == 'store'){
          loading.present();
          this.authProvider.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.recipesProvider.storeList(token)
                  .subscribe(
                    () => loading.dismiss(),
                    error => {
                      loading.dismiss();
                      console.log(error);
                      this.handleError(error.message);
                    }
                  )
              }
            )

        }
      }
    )
  }

  private handleError(errorMsg: string) {
    const alert = this.alertCtrl.create({
      title: "An error occured",
      message: errorMsg,
      buttons: ['OK']
    })
    alert.present();
  }

}
