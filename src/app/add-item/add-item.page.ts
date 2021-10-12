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

  constructor(private modalCtr: ModalController, private popoverCtr: PopoverController, private shoppingListData: ShoppingListsService, private alertController: AlertController, private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.listDetails = this.shoppingListData.shoppingListClicked;
    console.log(this.listDetails);
  }

  // addList() {
  //   this.modalCtr.create({
  //     component: AddListPage
  //   }).then(modalres => {
  //     modalres.present();
  //   })
  // }

  editListName(list) {

  }

  deleteList(ID) {
  }

  async presentDeleteConfirm(ID) {

  }


  addList() {
  }

  closeList() {
  }

}
