import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/Rx';
import { AuthProvider } from "./auth";

@Injectable()
export class ShoppingListProvider {
    private ingredients: Ingredient[] = [];

    constructor(
      private httpClient: HttpClient,
      private authService: AuthProvider
      ) {}

    addItem(name: string, amount: number) {
      this.ingredients.push(new Ingredient(name, amount));
      console.log(this.ingredients);
    }
  
    addItems(items: Ingredient[]) {
      this.ingredients.push(...items);
    }
  
    getItems() {
      return this.ingredients.slice();
    }
  
    removeItem(index: number) {
      this.ingredients.splice(index, 1);
    }

    storeList(token: string) {
      const userId = this.authService.getActiveUser().uid;
      return this.httpClient
        .put('https://recipe-book-mobile-43a62.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
    }

}