import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlarmRoutingModule } from './alarm-routing.module';
import { AlarmComponent } from './alarm.component';
import { AlarmService } from './../alarm.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { TriggerModule } from './../../shared';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlarmRoutingModule,
    TriggerModule,
    ColorPickerModule
  ],
  providers: [AlarmService],
  declarations: [AlarmComponent]
})
export class AlarmModule { }