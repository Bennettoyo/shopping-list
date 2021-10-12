import { ShoppingListsService } from './../shopping-lists.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonList, ModalController, PopoverController } from '@ionic/angular';
import { AddListPage } from '../add-list/add-list.page';
import { EditListPage } from '../edit-list/edit-list.page';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public listArray: any = [];
  public listInput: any = "";
  public addItemsClicked: any = false;

  @ViewChild("slidingList") list: IonList;

  constructor(private modalCtr: ModalController, private router: Router, private popoverCtr: PopoverController, private shoppingListData: ShoppingListsService, private alertController: AlertController, private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    let listData = this.shoppingListData.getListData();
    this.listArray = listData;
  }

  // addList() {
  //   this.modalCtr.create({
  //     component: AddListPage
  //   }).then(modalres => {
  //     modalres.present();
  //   })
  // }

  editListName(list) {
    this.shoppingListData.homePageSlider = this.list;
    this.popoverCtr.create({
      component: EditListPage,
      cssClass: 'my-custom-class',
      componentProps: { ID: list.ID, ListName: list.listName }
    }).then(popOverResp => {
      popOverResp.present();
    })
  }

  deleteList(ID) {
    this.listArray = this.listArray.filter(listArray => listArray.ID !== ID);
    this.changeDetection.detectChanges();
  }

  async presentDeleteConfirm(ID) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete List?',
      message: 'This will delete all the items in the list. Are you sure you want to delete this list?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteList(ID);
          }
        }
      ]
    });

    await alert.present();
  }


  addList() {
    if (this.listInput != "") {
      let obj: any = {};
      obj.listName = this.listInput;
      this.listArray.push(obj);
      this.listInput = "";
    }
  }

  closeList() {
    this.list.closeSlidingItems();
  }

  toAddingItems(list) {
    if (this.addItemsClicked == true) {
      this.shoppingListData.shoppingListClicked = list;
      this.router.navigate(['/add-item']);
    }
  }

}
