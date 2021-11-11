import { ShoppingListsService } from './../shopping-lists.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonList, ModalController, PopoverController } from '@ionic/angular';
import { AddListPage } from '../add-list/add-list.page';
import { EditListPage } from '../edit-list/edit-list.page';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {



  public listArray: any = [];
  public listInput: any = "";
  public addItemsClicked: any = false;
  public networkStatus: any = false;
  public onlineOffline: boolean = navigator.onLine;


  @ViewChild("slidingList") list: IonList;

  constructor(private storage: StorageService, private modalCtr: ModalController, private httpService: HttpService, private router: Router, private popoverCtr: PopoverController, private shoppingListData: ShoppingListsService, private alertController: AlertController, private changeDetection: ChangeDetectorRef) {
  }


  ngOnInit() {
    this.getListData();
  }


  getListData() {
    this.httpService.get("shopping/getShoppingLists").subscribe((rs: any) => {
      this.listArray = rs;
      let listArrayHolder = JSON.stringify(this.listArray);
      this.storage.setLocalStorage("listArray", listArrayHolder);
      this.changeDetection.detectChanges();
      this.shoppingListData.currentNameSubject$.next(this.listArray);
    }, (err) => {
      console.log(err);
    });
  }

  async editListName(list) {
    const popover = await this.popoverCtr.create({
      component: EditListPage,
      cssClass: 'my-custom-class',
      componentProps: { ID: list.ID, ListName: list.listName }
    });
    popover.present();
    this.closeList();
    return popover.onDidDismiss().then(
      (data: any) => {
        if (data) {
          this.getListData();
        }
      });
  }



  deleteList(ID) {
    // this.listArray = this.listArray.filter(listArray => listArray.ID !== ID);
    this.httpService.get("shopping/deleteList?ID=" + ID).subscribe((rs: any) => {
      this.listArray = rs;
      this.getListData();
    }, (err) => {
      console.log(err);
    });
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
      this.httpService.post("shopping/addList", { listName: this.listInput }).subscribe((rs: any) => {
        if (rs == 1) {
          this.getListData();
          console.log("Success")
        } else {
          console.log("Error")
        }
      }, (err: any) => {
        console.log("Error")
      });
    }
    this.listInput = "";
  }


  closeList() {
    this.list.closeSlidingItems();
  }


  toAddingItems(list) {
    // if (this.addItemsClicked == true) {
      list = JSON.stringify(list);
      this.storage.setLocalStorage("listDetails", list);
      this.router.navigate(['/add-item']);
    // }
  }

}
