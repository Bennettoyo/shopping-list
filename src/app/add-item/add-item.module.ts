import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';



import { IonicModule } from '@ionic/angular';

import { AddItemPageRoutingModule } from './add-item-routing.module';

import { AddItemPage } from './add-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    AddItemPageRoutingModule,
  ],
  declarations: [AddItemPage],
  providers: [{ provide: SpeechRecognition }],

})
export class AddItemPageModule { }
