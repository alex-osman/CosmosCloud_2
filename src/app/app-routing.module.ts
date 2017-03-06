import { NgModule }				from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } 		from './home/home.component';
import { RelayComponent } from './relay/relay.component';
import { IndicatorComponent }  from './indicator/indicator.component';
import { FileshareComponent }  from './fileshare/fileshare.component';

const routes: Routes = [

	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home',   component: HomeComponent },
	{ path: 'relays', component: RelayComponent },
	{ path: 'indicators', component: IndicatorComponent},
	{ path: 'fileshare', component: FileshareComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }