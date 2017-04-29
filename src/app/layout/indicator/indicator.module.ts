import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicatorRoutingModule } from './indicator-routing.module';
import { IndicatorComponent } from './indicator.component';

@NgModule({
  imports: [
    CommonModule,
    IndicatorRoutingModule
  ],
  declarations: [IndicatorComponent]
})
export class IndicatorModule { }