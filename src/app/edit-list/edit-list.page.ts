import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ShoppingListsService } from '../shopping-lists.service';




@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.page.html',
  styleUrls: ['./edit-list.page.scss'],
})
export class EditListPage implements OnInit {
  @Input() ListName: string;
  @Input() ID: number;


  constructor(private shoppingListData: ShoppingListsService, private popover: PopoverController) { }

  ngOnInit() {
  }

  editListName() {
    if (this.ListName.length > 0) {
      let editedList = this.shoppingListData.listArray.filter(listArray => listArray.ID == this.ID);
      editedList[0].listName = this.ListName;
      this.shoppingListData.listArray = this.shoppingListData.listArray.filter(listArray => listArray.ID !== this.ID);
      this.shoppingListData.listArray = this.shoppingListData.listArray.concat(editedList);
      this.popover.dismiss();
      this.closeList();
    }
  }

  closeList() {
    this.shoppingListData.closeList();
  }

}
