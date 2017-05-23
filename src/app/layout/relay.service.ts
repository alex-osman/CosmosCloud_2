import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Relay } from './relay';
import { Channel } from './channel';
import { Node } from './node';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class RelayService {

  private headers = new Headers({'Content-Type': 'application/json'})
  private relayUrl = '/relay';

  constructor(private http: Http) { }

  getRelays(): Promise<Relay[]> {
    return this.http.get(`${this.relayUrl}/all`)
      .toPromise()
      .then(response => response.json() as Relay[])
      .catch(this.handleError);
  }

  on(node: Node): Promise<boolean> {
    return this.http.get(`${this.relayUrl}/${node.ip}/on`)
      .toPromise()
      .then(response => JSON.parse(response.json()))
      .catch(this.handleError);
  }

  off(node: Node): Promise<boolean> {
    return this.http.get(`${this.relayUrl}/${node.ip}/off`)
      .toPromise()
      .then(response => JSON.parse(response.json()))
      .catch(this.handleError);
  }

  toggle(node: Node, channelI: number): Promise<boolean> {
    return this.http.get(`${this.relayUrl}/${node.ip}/toggle/${channelI}`)
      .toPromise()
      .then(response => JSON.parse(response.json())[channelI] as boolean)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('We have an error', error);
    return Promise.reject(error.message || error);
  }

}
