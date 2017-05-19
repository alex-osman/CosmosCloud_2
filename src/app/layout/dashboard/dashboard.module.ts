import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        DashboardRoutingModule,
    ],
    declarations: [
        DashboardComponent,
    ]
})
export class DashboardModule { }
