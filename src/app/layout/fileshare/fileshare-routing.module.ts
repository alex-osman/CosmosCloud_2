import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileshareComponent } from './fileshare.component';

const routes: Routes = [
    { path: '', component: FileshareComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FileshareRoutingModule { }