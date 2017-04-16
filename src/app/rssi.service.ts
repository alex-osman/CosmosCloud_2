import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RssiService {

  private headers = new Headers({ 'Content-Type': 'application/json'})
  private rssiUrl = '/rssi';

  constructor(private http: Http) { }

  getCurrentLocation(): Promise<String> {
    return this.http.get(`${this.rssiUrl}/currentLocation`)
      .toPromise()
      .then(response => response.text())
      .catch(this.handleError);
  }

  setupRoom(): Promise<void> {
    return this.http.get(`${this.rssiUrl}/setup`)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError)
  }

  submitRoom(roomName: String): Promise<void> {
    return this.http.get(`${this.rssiUrl}/finish/${roomName}`)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.log("We have an error", error);
    return Promise.reject(error.message || error);
  }

}
