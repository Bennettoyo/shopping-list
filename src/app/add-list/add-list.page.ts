import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShoppingListsService } from '../shopping-lists.service';

import { faDrumstickBite } from '@fortawesome/free-solid-svg-icons';
import { faFish } from '@fortawesome/free-solid-svg-icons';
import { faCheese } from '@fortawesome/free-solid-svg-icons';
import { faCarrot } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import { faWineGlassAlt } from '@fortawesome/free-solid-svg-icons';
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons';
import { faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { faPepperHot } from '@fortawesome/free-solid-svg-icons';
import { faPumpSoap } from '@fortawesome/free-solid-svg-icons';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.page.html',
  styleUrls: ['./add-list.page.scss'],
})
export class AddListPage implements OnInit {
  @Input() ItemName: string;
  @Input() ItemId: string;
  meat = faDrumstickBite;
  fish = faFish;
  dairy = faCheese;
  produce = faCarrot;
  frozen = faSnowflake;
  drinks = faTint;
  hotDrinks = faMugHot;
  alcohol = faWineGlassAlt;
  bakery = faBreadSlice;
  snack = faCookieBite;
  spices = faPepperHot;
  cleaning = faPumpSoap;
  clothes = faTshirt;
  general = faShoppingBasket;
  medicine = faPills;
  pet = faPaw;
  other = faQuestion;



  constructor(private modalCtrl: ModalController, private shoppingListData: ShoppingListsService) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss({ ChosenCategory: "", ItemID: "", ItemName: "" });
  }

  chosenCategory(chosenCategory) {
    this.modalCtrl.dismiss({ ChosenCategory: chosenCategory, ItemID: this.ItemId, ItemName: this.ItemName });
  }
}
