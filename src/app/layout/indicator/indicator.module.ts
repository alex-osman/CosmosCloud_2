import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicatorRoutingModule } from './indicator-routing.module';
import { IndicatorComponent } from './indicator.component';
import { NodeService } from './../node.service';
import { RelayService } from './../relay.service';
import { IndicatorService } from './../indicator.service';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    IndicatorRoutingModule,
    ColorPickerModule
  ],
  providers: [NodeService, RelayService, IndicatorService],
  declarations: [IndicatorComponent]
})
export class IndicatorModule { }