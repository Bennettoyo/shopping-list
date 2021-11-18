import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.page.html',
  styleUrls: ['./edit-list.page.scss'],
})
export class EditListPage implements OnInit {
  @Input() ListName: string;
  @Input() ID: number;
  public listArray: any;


  constructor(private popover: PopoverController, private httpService: HttpService) { }

  ngOnInit() {
  }

  editListName() {
    if (this.ListName.length > 0) {
      this.popover.dismiss({ data: true, listName: this.ListName, ID: this.ID });
    }
  }
}
