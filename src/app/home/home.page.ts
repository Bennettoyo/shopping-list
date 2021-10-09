import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddListPage } from '../add-list/add-list.page';
import { EditListPage } from '../edit-list/edit-list.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public listArray: any = [];
  public listInput: any = "";

  constructor(private modalCtr: ModalController, private popoverCtr: PopoverController) { }

  ngOnInit() {
    var obj: any = {};
    obj.listName = "List 1"
    this.listArray.push(obj);
  }

  // addList() {
  //   this.modalCtr.create({
  //     component: AddListPage
  //   }).then(modalres => {
  //     modalres.present();
  //   })
  // }

  editListName() {
    this.popoverCtr.create({
      component: EditListPage
    }).then(popOverResp => {
      popOverResp.present();
    })
  }

  addList() {
    if (this.listInput != "") {
      let obj: any = {};
      obj.listName = this.listInput;
      this.listArray.push(obj);
      this.listInput = "";
    }
  }

}
