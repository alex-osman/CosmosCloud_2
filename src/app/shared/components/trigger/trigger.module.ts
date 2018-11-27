import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NodeService } from './../../../layout/node.service';
import { ColorPickerModule } from 'ngx-color-picker';

import { TriggerComponent } from './trigger.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ColorPickerModule,
        RouterModule
    ],
    providers: [ NodeService ],
    declarations: [ TriggerComponent ],
    exports: [ TriggerComponent ]
})
export class TriggerModule { }