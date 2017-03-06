import { NgModule }				from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } 		from './home.component';
import { RelaysComponent }		from './relays.component';
import { IndicatorsComponent }  from './indicators.component';
import { FileShareComponent }  from './fileshare.component';

const routes: Routes = [

	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home',   component: HomeComponent },
	{ path: 'relays', component: RelaysComponent },
	{ path: 'indicators', component: IndicatorsComponent},
	{ path: 'fileshare', component: FileShareComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }