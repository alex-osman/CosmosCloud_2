import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ColorPickerModule } from 'angular2-color-picker';

import { AppComponent } from './app.component';
import { AppRoutingModule }   from './app-routing.module';
import { RelayComponent } from './relay/relay.component';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileshareComponent } from './fileshare/fileshare.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { HomeComponent } from './home/home.component';
import { RelayService } from './relay.service';
import { IndicatorService } from './indicator.service';
import { NodeService } from './node.service';
import { FileService } from './file.service';
import { RssiService } from './rssi.service';
import { RoomSetupComponent } from './room-setup/room-setup.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RelayComponent,
    FileshareComponent,
    IndicatorComponent,
    HomeComponent,
    FileSelectDirective,
    FileDropDirective,
    RoomSetupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    ColorPickerModule,
  ],
  providers: [ NodeService, RelayService, IndicatorService, FileService, RssiService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
