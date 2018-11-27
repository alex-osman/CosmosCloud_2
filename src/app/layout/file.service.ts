import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { File } from './file';

@Injectable()
export class FileService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private fileUrl = "/api/files"; //Url to fileshare
  constructor(private http: HttpClient) { }

  getFiles(): Promise<File[]> {
    return this.http.get(`${this.fileUrl}/all`)
      .toPromise()
      .then(response => response as File[])
      .catch(this.handleError);
  }

  deleteFile(id: number): Promise<any> {
    return this.http.delete(`${this.fileUrl}/${id}`)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("We have an error", error);
    return Promise.reject(error.message || error);
  }
}
