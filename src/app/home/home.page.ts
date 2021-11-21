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
  public allShoppingItems: any = [];
  public listInput: any = "";
  public addItemsClicked: any = false;
  public networkStatus: any = false;
  public onlineOffline: boolean = navigator.onLine;


  @ViewChild("slidingList") list: IonList;

  constructor(private storage: StorageService, private modalCtr: ModalController, private httpService: HttpService, private router: Router, private popoverCtr: PopoverController, private shoppingListData: ShoppingListsService, private alertController: AlertController, private changeDetection: ChangeDetectorRef) {
  }


  ngOnInit() {
    this.getListData();
    this.getItemsData();
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

  getItemsData() {
    this.httpService.get("shopping/getAllShoppingItems").subscribe((rs: any) => {
      this.allShoppingItems = rs;
      let shoppingItems = JSON.stringify(this.allShoppingItems);
      this.storage.setLocalStorage("shoppingItems", shoppingItems);
      this.changeDetection.detectChanges();
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
      (results: any) => {
        if (results.data) {
          // Editing Locally
          var foundIndex = this.listArray.findIndex(x => x.ID == results.data.ID);
          let listName = results.data.listName;
          this.listArray[foundIndex].listName = listName;
          this.editList(results.data)
        }
      });
  }



  deleteList(ID) {
    this.listArray = this.listArray.filter(listArray => listArray.ID !== ID);
    this.changeDetection.detectChanges();
    this.httpService.get("shopping/deleteList?ID=" + ID).subscribe((rs: any) => {
      // this.listArray = rs;
      // this.getListData();
    }, (err) => {
      console.log(err);
    });
  }

  editList(data) {
    this.httpService.post("shopping/editListName", { listName: data.listName, ID: data.ID }).subscribe((rs: any) => {
      if (rs == 1) {
        // console.log("Success")
      } else {
        console.log("Error")
      }
    }, (err: any) => {
      console.log("Error")
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
        if (rs !== 0) {
          var newList = { ID: rs, listName: this.listInput };
          this.listArray.push(newList);
          this.listInput = "";
          // this.getListData();
          console.log("Success")
        } else {
          console.log("Error")
          this.listInput = "";
        }
      }, (err: any) => {
        console.log("Error")
        this.listInput = "";
      });
    }
  }


  closeList() {
    this.list.closeSlidingItems();
  }


  toAddingItems(list) {
    if (this.addItemsClicked == true) {
      list = JSON.stringify(list);
      this.storage.setLocalStorage("listDetails", list);
      this.router.navigate(['/add-item']);
    }
  }

}
