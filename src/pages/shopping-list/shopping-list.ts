import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListProvider } from '../../providers/ShoppingListProvider';
import { Ingredient } from '../../models/ingredient';
import { PopoverController } from 'ionic-angular';
import { SLOptionsPage } from './sl-options/sl-options';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(
    private slProvider: ShoppingListProvider,
    private popOverCtrl: PopoverController
    ) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slProvider.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onRemoveItem(index: number) {
    this.slProvider.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent) {
    const popover = this.popOverCtrl.create(SLOptionsPage);
    // allows the popover to know the location to present itself
    // 'ev' is a reserved property for NavOptions
    popover.present({ev: event}); 
  }

  private loadItems() {
    this.listItems = this.slProvider.getItems();
  }
}
