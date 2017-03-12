import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { File } from '../file';
import { FileService } from '../file.service';

const URL = '/api/files';

@Component({
  selector: 'app-fileshare',
  templateUrl: './fileshare.component.html',
  styleUrls: ['./fileshare.component.css']
})
export class FileshareComponent {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  files: File[];
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.getFiles()
  }

  getFiles(): void {
    this.fileService.getFiles().then((files) => this.files = files);
  }
  
}
