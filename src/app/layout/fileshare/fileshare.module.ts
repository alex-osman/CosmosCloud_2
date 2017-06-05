import { FileSizePipe } from './../../shared/pipes/file-size.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileshareRoutingModule } from './fileshare-routing.module';
import { FileshareComponent } from './fileshare.component';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileService } from './../file.service';

@NgModule({
  imports: [
    CommonModule,
    FileshareRoutingModule
  ],
  providers: [FileService],
  declarations: [FileshareComponent, FileSelectDirective, FileDropDirective, FileSizePipe]
})
export class FileshareModule { }