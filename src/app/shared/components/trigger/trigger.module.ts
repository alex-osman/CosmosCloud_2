import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NodeService } from './../../../layout/node.service';
import { ColorPickerModule, ColorPickerService } from 'angular2-color-picker';

import { TriggerComponent } from './trigger.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ColorPickerModule,
        RouterModule
    ],
    providers: [ NodeService, ColorPickerService ],
    declarations: [ TriggerComponent ],
    exports: [ TriggerComponent ]
})
export class TriggerModule { }