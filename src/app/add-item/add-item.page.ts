import { ShoppingListsService } from './../shopping-lists.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonList, ModalController, PopoverController } from '@ionic/angular';
import { AddListPage } from '../add-list/add-list.page';
import { EditListPage } from '../edit-list/edit-list.page';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  public listDetails: any;
  public itemInput: any;

  constructor(private modalCtr: ModalController, private popoverCtr: PopoverController, private shoppingListData: ShoppingListsService, private alertController: AlertController, private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.listDetails = this.shoppingListData.shoppingListClicked;
    debugger;
    console.log(this.listDetails);
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


  addList() {
    if (this.itemInput != "") {
      let obj: any = {};
      obj.itemName = this.itemInput;
      obj.ID = 4;
      obj.Status = 0;
      // this.listDetails.Items.push(obj);
      this.itemInput = "";
      this.shoppingListData.shoppingItem = obj;

      this.openModal();
    }
  }

  closeList() {
  }

}
