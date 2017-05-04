import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RelayRoutingModule } from './relay-routing.module';
import { RelayComponent } from './relay.component';
import { NodeService } from './../node.service';
import { RelayService } from './../relay.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RelayRoutingModule
  ],
  providers: [NodeService, RelayService],
  declarations: [RelayComponent]
})
export class RelayModule { }