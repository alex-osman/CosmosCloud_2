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
    this.getFiles();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (item.isSuccess) {
        this.getFiles();
      } else {
        console.log("Not successful");
        console.log(item)
        console.log(response)
        console.log(status)
        console.log(headers)
      }
    }
  }

  getFiles(): void {
    this.fileService.getFiles().then((files) => this.files = files);
  }
  
  remove(file): void {
    this.fileService.deleteFile(file._id).then((res) => this.getFiles());
  }
}
