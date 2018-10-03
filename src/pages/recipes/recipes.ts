import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipesProvider } from '../../providers/recipes';
import { RecipePage } from '../recipe/recipe';
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private recipesProvider: RecipesProvider
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

}
