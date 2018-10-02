import { Component, OnInit } from '@angular/core';
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesProvider } from '../../providers/recipes';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard']
  recipeForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipesProvider: RecipesProvider
  ) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        // transform an array of strings into an array of objects
        return {name: name, amount: 1}
      });
    }
    console.log(value);
    this.recipesProvider.addRecipe(value.title, value.description, value.difficulty, value.ingredients);
    console.log(this.recipeForm);
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      'title': 'What would you like to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: "Remove all Ingredients",
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i>=0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: "All ingredients deleted",
                duration: 1000,
                position: 'top'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              const toast = this.toastCtrl.create({
                message: "Please enter a valid value",
                duration: 1500,
                position: 'top'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: "Item added",
              duration: 1000,
              position: 'top'
            });
            toast.present();
          }
        }
      ]
    });
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([])
    });
  }



}
