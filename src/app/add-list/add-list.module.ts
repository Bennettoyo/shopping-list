import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { IonicModule } from '@ionic/angular';

import { AddListPageRoutingModule } from './add-list-routing.module';

import { AddListPage } from './add-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddListPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [AddListPage]
})
export class AddListPageModule {}
