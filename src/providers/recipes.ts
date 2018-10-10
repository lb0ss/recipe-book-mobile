import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthProvider } from "./auth";

@Injectable()
export class RecipesProvider {
    private recipes: Recipe[] = [];

    constructor(
        private httpClient: HttpClient,
        private authService: AuthProvider
        ) {}

    addRecipe(
        title: string, 
        description: string, 
        difficulty: string,
        ingredients: Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients))
        console.log(this.recipes);
    }

    getRecipe() {
        return this.recipes.slice();
    }

    updateRecipe(
        index: number,
        title: string, 
        description: string, 
        difficulty: string,
        ingredients: Ingredient[]) {

        this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.httpClient.put('https://recipe-book-mobile-43a62.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes);
    }

    fetchList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.httpClient.get('https://recipe-book-mobile-43a62.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
        .do((recipes: Recipe[]) => {
            if (recipes) {
                this.recipes = recipes;
            } else {
                this.recipes = [];
            }
        })
    }
}