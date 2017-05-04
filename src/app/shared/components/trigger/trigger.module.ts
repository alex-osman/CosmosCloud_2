import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { TriggerComponent } from './trigger.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ColorPickerModule,
        RouterModule
    ],
    declarations: [ TriggerComponent ],
    exports: [ TriggerComponent ]
})
export class TriggerModule { }