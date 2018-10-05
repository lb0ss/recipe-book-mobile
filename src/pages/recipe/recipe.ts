import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListProvider } from '../../providers/ShoppingListProvider';
import { RecipesProvider } from '../../providers/recipes';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private slProvider: ShoppingListProvider,
    private recipesProvider: RecipesProvider
    ) {
  }

  ngOnInit () {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
    console.log(this.recipe);
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {
      mode: "Edit",
      recipe: this.recipe,
      index: this.index
    })
  }

  onAddIngredients() {
    this.slProvider.addItems(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipesProvider.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
