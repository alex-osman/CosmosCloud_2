import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = '/api/files';

@Component({
  selector: 'app-fileshare',
  templateUrl: './fileshare.component.html',
  styleUrls: ['./fileshare.component.css']
})
export class FileshareComponent {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  
}
