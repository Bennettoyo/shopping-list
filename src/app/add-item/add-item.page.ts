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

  constructor(private modalCtr: ModalController, private httpService: HttpService, private popoverCtr: PopoverController, private shoppingListData: ShoppingListsService, private alertController: AlertController, private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.listDetails = this.shoppingListData.shoppingListClicked;
    debugger;
    this.getItemsData();
  }

  getItemsData() {
    this.httpService.get("shopping/getShoppingItems?ID=" + this.listDetails.ID).subscribe((rs: any) => {
      this.shoppingItems = rs;
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

  editListName(list) {

  }

  deleteList(ID) {
  }

  async presentDeleteConfirm(ID) {

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

  closeList() {
  }

}
