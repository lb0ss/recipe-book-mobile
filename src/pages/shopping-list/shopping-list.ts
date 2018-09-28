import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListProvider } from '../../providers/ShoppingListProvider';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(private slProvider: ShoppingListProvider) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slProvider.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slProvider.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.slProvider.getItems();
  }
}
