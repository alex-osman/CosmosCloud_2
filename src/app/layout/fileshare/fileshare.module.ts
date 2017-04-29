import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileshareRoutingModule } from './fileshare-routing.module';
import { FileshareComponent } from './fileshare.component';

@NgModule({
  imports: [
    CommonModule,
    FileshareRoutingModule
  ],
  declarations: [FileshareComponent]
})
export class FileshareModule { }