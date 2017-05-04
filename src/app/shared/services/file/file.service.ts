import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { File } from './../file';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FileService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private fileUrl = "/api/files"; //Url to fileshare
  constructor(private http: Http) { }

  getFiles(): Promise<File[]> {
    return this.http.get(`${this.fileUrl}/all`)
      .toPromise()
      .then(response => response.json() as File[])
      .catch(this.handleError);
  }

  deleteFile(id: number): Promise<any> {
    return this.http.delete(`${this.fileUrl}/${id}`)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("We have an error", error);
    return Promise.reject(error.message || error);
  }
}
