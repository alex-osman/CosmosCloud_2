import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomSetupComponent } from './room-setup.component';

const routes: Routes = [
    { path: '', component: RoomSetupComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoomSetupRoutingModule { }