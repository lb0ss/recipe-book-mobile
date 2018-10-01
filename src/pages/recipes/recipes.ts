import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {
      mode: 'New'
    });
  }

}
