import { Component, OnInit } from '@angular/core';
import { faDrumstickBite } from '@fortawesome/free-solid-svg-icons';
import { ModalController } from '@ionic/angular';
import { ShoppingListsService } from '../shopping-lists.service';



@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.page.html',
  styleUrls: ['./add-list.page.scss'],
})
export class AddListPage implements OnInit {
  public itemDetails: any;
  faDrumstickBite = faDrumstickBite;


  constructor(private modalCtrl: ModalController, private shoppingListData: ShoppingListsService) { }

  ngOnInit() {
    this.itemDetails = this.shoppingListData.shoppingItem;
    console.log(this.itemDetails);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
