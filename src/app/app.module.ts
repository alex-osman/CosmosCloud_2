import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ColorPickerModule } from 'angular2-color-picker';

import { AppComponent } from './app.component';
import { AppRoutingModule }   from './app-routing.module';
import { RelayComponent } from './relay/relay.component';
import { FileshareComponent } from './fileshare/fileshare.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { HomeComponent } from './home/home.component';
import { RelayService } from './relay.service';
import { IndicatorService } from './indicator.service';
import { NodeService } from './node.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RelayComponent,
    FileshareComponent,
    IndicatorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    ColorPickerModule
  ],
  providers: [ NodeService, RelayService, IndicatorService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
