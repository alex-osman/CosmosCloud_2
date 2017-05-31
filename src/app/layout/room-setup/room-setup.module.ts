import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RoomSetupRoutingModule } from './room-setup-routing.module';
import { RoomSetupComponent } from './room-setup.component';
import { RssiService } from './../rssi.service';
import { Room } from './../room';
import { ColorPickerModule } from 'angular2-color-picker';
import { TriggerModule } from './../../shared';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule,
    TriggerModule,
    RoomSetupRoutingModule
  ],
  providers: [RssiService],
  declarations: [RoomSetupComponent]
})
export class RoomSetupModule { }