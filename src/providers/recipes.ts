import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { AuthProvider } from "./auth";
import 'rxjs/Rx';

@Injectable()
export class RecipesProvider {
    private recipes: Recipe[] = [];

    constructor(
        private httpClient: HttpClient,
        private http: Http,
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
        return this.http.get('https://recipe-book-mobile-43a62.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
					.map((response: Response)=> {
							const recipes: Recipe[] = response.json() ? response.json() : [];
							for (let item of recipes) {
								if (!item.hasOwnProperty('ingredients')) {
									item.ingredients = [];
								}
							}
							return recipes;
					})
					.do((recipes: Recipe[])=> {
						if (recipes) {
							this.recipes = recipes;
						} else {
							this.recipes = [];
						}
					})
    }
}