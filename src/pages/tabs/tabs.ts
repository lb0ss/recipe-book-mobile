import { Component } from '@angular/core';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecipePage } from '../recipe/recipe';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  slPage = ShoppingListPage;
  recipesPage = RecipePage;

}
