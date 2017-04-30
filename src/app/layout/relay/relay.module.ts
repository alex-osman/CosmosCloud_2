import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelayRoutingModule } from './relay-routing.module';
import { RelayComponent } from './relay.component';
import { NodeService } from './../node.service';
import { RelayService } from './../relay.service';

@NgModule({
  imports: [
    CommonModule,
    RelayRoutingModule
  ],
  providers: [NodeService, RelayService],
  declarations: [RelayComponent]
})
export class RelayModule { }