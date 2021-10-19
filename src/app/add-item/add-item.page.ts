import { EditItemPage } from './../edit-item/edit-item.page';
import { ShoppingListsService } from './../shopping-lists.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonList, ModalController, PopoverController } from '@ionic/angular';
import { AddListPage } from '../add-list/add-list.page';
import { EditListPage } from '../edit-list/edit-list.page';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  public listDetails: any;
  public shoppingItems: any;
  public itemInput: any;

  @ViewChild("slidingList") list: IonList;


  constructor(private modalCtr: ModalController, private httpService: HttpService, private popoverCtr: PopoverController, private shoppingListData: ShoppingListsService, private alertController: AlertController, private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.listDetails = this.shoppingListData.shoppingListClicked;
    this.getItemsData();
  }

  getItemsData() {
    this.httpService.get("shopping/getShoppingItems?ID=" + this.listDetails.ID).subscribe((rs: any) => {
      this.shoppingItems = rs;
      this.changeDetection.detectChanges();
    }, (err) => {
      console.log(err);
    });
  }

  openModal() {
    this.modalCtr.create({
      component: AddListPage
    }).then(modalres => {
      modalres.present();
    })
  }


  async editItemName(item) {
    const popover = await this.popoverCtr.create({
      component: EditItemPage,
      cssClass: 'my-custom-class',
      componentProps: { ID: item.ID, ItemName: item.itemName }
    });
    popover.present();
    this.closeListItem();
    // listens to promise? Or return response?
    return popover.onDidDismiss().then(
      (data: any) => {
        if (data) {
          this.getItemsData();
        }
      });
  }


  deleteListItem(ID) {
    this.httpService.get("shopping/deleteItem?ID=" + ID).subscribe((rs: any) => {
      if (rs == 1) {
        console.log("all good");
        // this.closeList();
        this.getItemsData();
      }
    }, (err) => {
      console.log(err);
    });
  }

  async presentDeleteConfirm(ID) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Item?',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteListItem(ID);
          }
        }
      ]
    });
    await alert.present();
  }


  addItem() {
    if (this.itemInput != "") {
      this.httpService.post("shopping/addItem", { itemName: this.itemInput, ShoppingListID: this.listDetails.ID }).subscribe((rs: any) => {
        if (rs == 1) {
          this.getItemsData();
          this.itemInput = "";
          console.log("Success")
        } else {
          console.log("Error")
        }
      }, (err: any) => {
        console.log("Error")
      });
    }
    // for adding icons
    // this.openModal();
  }

  closeListItem() {
    this.list.closeSlidingItems();
  }

}
