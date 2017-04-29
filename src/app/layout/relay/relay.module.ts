import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelayRoutingModule } from './relay-routing.module';
import { RelayComponent } from './relay.component';

@NgModule({
  imports: [
    CommonModule,
    RelayRoutingModule
  ],
  declarations: [RelayComponent]
})
export class RelayModule { }