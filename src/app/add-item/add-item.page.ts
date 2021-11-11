import { EditItemPage } from './../edit-item/edit-item.page';
import { ShoppingListsService } from './../shopping-lists.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonList, ModalController, PopoverController } from '@ionic/angular';
import { AddListPage } from '../add-list/add-list.page';
import { EditListPage } from '../edit-list/edit-list.page';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';



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
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  public listDetails: any;
  public shoppingItems: any;
  public itemInput: any;
  public itemId: any;
  public editedCategoryName: any;
  public showAudioResult = false;
  public noItemsLeft = false;
  public onlineOffline: boolean = navigator.onLine;


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


  matches: string[];


  @ViewChild("slidingList") list: IonList;
  @ViewChild('content') private content: any;



  constructor(private storage: StorageService, private SpeechRecognition: SpeechRecognition, private modalCtr: ModalController, private httpService: HttpService, private popoverCtr: PopoverController, private shoppingListData: ShoppingListsService, private alertController: AlertController, private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    let list = this.storage.getLocalStorage("listDetails");
    this.listDetails = JSON.parse(list);
    this.getItemsData();
  }

  checkListening() {
    this.SpeechRecognition.hasPermission()
      .then((hasPermission: Boolean) => {
        if (!hasPermission) {
          this.SpeechRecognition.requestPermission().then(
            () => this.startListening()
          );
        } else {
          this.startListening();
        }
      })
  }

  startListening() {
    this.SpeechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.addAudioResult(this.matches[0].toString());
    });
  }

  addAudioResult(audioResult) {
    this.editedCategoryName = audioResult;
    this.openModal();
  }

  getItemsData() {
    this.httpService.get("shopping/getShoppingItems?ID=" + this.listDetails.ID).subscribe((rs: any) => {
      this.shoppingItems = rs;
      let shoppingItems = JSON.stringify(this.shoppingItems);
      this.storage.setLocalStorage("shoppingItems", shoppingItems);
      this.changeDetection.detectChanges();
      this.checkingItemsLeft();
    }, (err) => {
      console.log(err);
    });
  }

  editCategoryIcon(item) {
    this.itemId = item.ID;
    this.editedCategoryName = item.itemName;
    this.openModal();
  }

  async openModal() {
    let ItemName;
    if (this.itemInput == "" || this.itemInput == null) {
      ItemName = this.editedCategoryName;
    } else {
      ItemName = this.itemInput;
    }
    const modal = await this.modalCtr.create({
      component: AddListPage,
      cssClass: 'my-custom-class',
      componentProps: { ItemName: ItemName, ItemId: this.itemId }
    })
    this.editedCategoryName = "";
    this.itemInput = "";
    modal.present();
    return modal.onDidDismiss().then(
      (data: any) => {
        if (data) {
          this.addItem(data.data);
        }
      });
  }

  addItem(editedItem) {
    if (editedItem.ItemName != "") {
      this.httpService.post("shopping/addItem", { itemName: editedItem.ItemName, ShoppingListID: this.listDetails.ID, Category: editedItem.ChosenCategory, ID: editedItem.ItemID }).subscribe((rs: any) => {
        if (rs == 1) {
          this.getItemsData();
          this.itemInput = "";
          // console.log("Success")
        } else {
          // console.log("Error")
        }
      }, (err: any) => {
        // console.log("Error")
      });
    }
    this.itemId = "";
  }

  async editItemName(item) {
    const popover = await this.popoverCtr.create({
      component: EditItemPage,
      cssClass: 'my-custom-class',
      componentProps: { ID: item.ID, ItemName: item.itemName }
    });
    popover.present();
    this.closeListItem();
    // listens to promise? Or return response?
    return popover.onDidDismiss().then(
      (data: any) => {
        if (data) {
          this.getItemsData();
        }
      });
  }


  deleteListItem(ID) {
    this.httpService.get("shopping/deleteItem?ID=" + ID).subscribe((rs: any) => {
      if (rs == 1) {
        // console.log("all good");
        // this.closeList();
        this.getItemsData();
        this.checkingItemsLeft();
      }
    }, (err) => {
      console.log(err);
    });
  }

  checkingItemsLeft() {
    const anyItemsLeft = this.shoppingItems.filter(e => e.Status == 0);
    if (anyItemsLeft.length == 0) {
      this.noItemsLeft = true;
    } else {
      this.noItemsLeft = false;
    }
  }

  isChecked(item) {
    if (item.Status == 1) {
      item.Status = 0
    } else {
      item.Status = 1
    }
    this.checkingItemsLeft();
    const anyItemsLeft = this.shoppingItems.filter(e => e.Status == 0);
    if (anyItemsLeft.length == 0) {
      this.noItemsLeft = true;
    } else {
      this.noItemsLeft = false;
    }
    this.httpService.get("shopping/checkedItem?ID=" + item.ID + "&Status=" + item.Status).subscribe((rs: any) => {
      if (rs == 1) {
        // console.log("all good");
        // this.closeList();
        // this.getItemsData();
      }
    }, (err) => {
      console.log(err);
    });
  }

  async presentDeleteConfirm(ID) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Item?',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteListItem(ID);
          }
        }
      ]
    });
    await alert.present();
  }

  closeListItem() {
    this.list.closeSlidingItems();
  }

  getIconColour(icon) {
    switch (icon) {
      case "meat":
        return "meat-icon";
      case "fish":
        return "fish-icon";
      case "dairy":
        return "dairy-icon";
      case "produce":
        return "produce-icon";
      case "frozen":
        return "frozen-icon";
      case "drinks":
        return "drinks-icon";
      case "hotDrinks":
        return "hotDrinks-icon";
      case "alcohol":
        return "alcohol-icon";
      case "bakery":
        return "bakery-icon";
      case "snack":
        return "snack-icon";
      case "condiments":
        return "spices-icon";
      case "cleaning":
        return "cleaning-icon";
      case "clothes":
        return "clothes-icon";
      case "general":
        return "general-icon";
      case "medicine":
        return "medicine-icon";
      case "pet":
        return "pet-icon";
      case "other":
        return "other-icon";
      default:
        break;
    }
  }

  iconMatching(icon) {
    switch (icon) {
      case "meat":
        return this.meat;
      case "fish":
        return this.fish;
      case "dairy":
        return this.dairy;
      case "produce":
        return this.produce;
      case "frozen":
        return this.frozen;
      case "drinks":
        return this.drinks;
      case "hotDrinks":
        return this.hotDrinks;
      case "alcohol":
        return this.meat;
      case "bakery":
        return this.bakery;
      case "snack":
        return this.snack;
      case "spices":
        return this.spices;
      case "cleaning":
        return this.cleaning;
      case "clothes":
        return this.clothes;
      case "general":
        return this.general;
      case "medicine":
        return this.medicine;
      case "pet":
        return this.pet;
      case "other":
        return this.other;
      default:
        break;
    }
  }

}
