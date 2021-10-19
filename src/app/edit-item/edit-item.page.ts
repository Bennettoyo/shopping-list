import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})

export class EditItemPage implements OnInit {

  @Input() ItemName: string;
  @Input() ID: number;
  public itemArray: any;


  constructor(private popover: PopoverController, private httpService: HttpService) { }

  ngOnInit() {
  }

  editListName() {
    if (this.ItemName.length > 0) {
      this.httpService.post("shopping/editItemName", { itemName: this.ItemName, ID: this.ID }).subscribe((rs: any) => {
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
