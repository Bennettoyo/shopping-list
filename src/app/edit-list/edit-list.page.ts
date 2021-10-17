import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { ShoppingListsService } from '../shopping-lists.service';




@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.page.html',
  styleUrls: ['./edit-list.page.scss'],
})
export class EditListPage implements OnInit {
  @Input() ListName: string;
  @Input() ID: number;
  public listArray: any;


  constructor(private shoppingListData: ShoppingListsService, private popover: PopoverController, private httpService: HttpService) { }

  ngOnInit() {
  }

  editListName() {
    if (this.ListName.length > 0) {
      this.httpService.post("shopping/editListName", { listName: this.ListName, ID: this.ID }).subscribe((rs: any) => {
        if (rs == 1) {
          // console.log("Success")
        } else {
          console.log("Error")
        }
      }, (err: any) => {
        console.log("Error")
      });
      this.popover.dismiss({ data: true });
    }
  }
}
