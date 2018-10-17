import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListProvider } from '../../providers/ShoppingListProvider';
import { Ingredient } from '../../models/ingredient';
import { PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { DatabaseOptionsPage } from '../database-options/database-options';
import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(
    private slProvider: ShoppingListProvider,
    private popOverCtrl: PopoverController,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
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
    const loading = this.loadingCtrl.create({
      content: 'Please wait'
    });
    const popover = this.popOverCtrl.create(DatabaseOptionsPage);
    // allows the popover to know the location to present itself
    // 'ev' is a reserved property for NavOptions
    popover.present({ev: event}); 
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        if (data.action == 'load') {
          loading.present();
          this.authProvider.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.slProvider.fetchList(token)
                .subscribe(
                  (list: Ingredient[]) => {
                    loading.dismiss();
                    if (list) {
                      this.listItems = list;
                    } else {
                      this.listItems = [];
                    }
                  },
                  error => {
                    loading.dismiss();
                    console.log(error);
                    this.handleError(error.message);
                  }
                )
            }
          )
        } else if (data.action == 'store'){
          loading.present();
          this.authProvider.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.slProvider.storeList(token)
                  .subscribe(
                    () => loading.dismiss(),
                    error => {
                      loading.dismiss();
                      console.log(error);
                      this.handleError(error.message);
                    }
                  )
              }
            )

        }
      }
    )
  }

  private loadItems() {
    this.listItems = this.slProvider.getItems();
  }

  private handleError(errorMsg: string) {
    const alert = this.alertCtrl.create({
      title: "An error occured",
      message: errorMsg,
      buttons: ['OK']
    })
    alert.present();
  }
}
