import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'relay', loadChildren: './relay/relay.module#RelayModule' },
            { path: 'fileshare', loadChildren: './fileshare/fileshare.module#FileshareModule' },
            { path: 'indicator', loadChildren: './indicator/indicator.module#IndicatorModule' },
            { path: 'alarm', loadChildren: './alarm/alarm.module#AlarmModule' },
            { path: 'room-setup', loadChildren: './room-setup/room-setup.module#RoomSetupModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
