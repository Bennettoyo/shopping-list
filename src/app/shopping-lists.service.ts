import { Injectable, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService {
  public listArray: any = [];
  public homePageSlider: any;
  public shoppingListClicked: any;

  constructor() { }


  getListData() {
    var obj1: any = {};
    var obj2: any = {};
    var obj3: any = {};
    obj1.listName = "List 1"
    obj1.ID = 1
    obj1.Items = [{ID: 1, itemName: "Banana", Category: "Fruit", Status: 0}, {ID: 2, itemName: "Steak", Category: "Meat", Status: 0}, {ID: 3, itemName: "Brocoli", Category: "Vegetable", Status: 1}]
    this.listArray.push(obj1);
    obj2.listName = "List 2"
    obj2.ID = 2
    this.listArray.push(obj2);
    obj3.listName = "List 3"
    obj3.ID = 3
    this.listArray.push(obj3);
    return this.listArray;
  }

  closeList() {
    this.homePageSlider.closeSlidingItems();
  }
}
