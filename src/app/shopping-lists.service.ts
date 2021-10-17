import { Injectable, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService {
  public listArray: any = [];
  public shoppingListClicked: any;
  public shoppingItem: any;

  public currentNameSubject$ = new BehaviorSubject(this.listArray);



  constructor(public httpService: HttpService) { }

  // getListData() {
  //   this.httpService.get("shopping/getShoppingLists").subscribe((rs: any) => {
  //     this.listArray = rs;
  //     // this.currentNameSubject$.next("Testing");
  //     // console.log(this.currentNameSubject$.getValue());
  //     this.currentNameSubject$.next(this.listArray);
  //     console.log(this.currentNameSubject$.getValue());
  //     return rs;
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }


}
