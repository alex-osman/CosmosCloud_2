import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmComponent } from './alarm.component';

const routes: Routes = [
    { path: '', component: AlarmComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlarmRoutingModule { }