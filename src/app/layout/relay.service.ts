import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Relay } from './relay';
import { Channel } from './channel';
import { Node } from './node';


@Injectable()
export class RelayService {

  private headers = new Headers({'Content-Type': 'application/json'})
  private relayUrl = '/relay';

  constructor(private http: HttpClient) { }

  getRelays(): Promise<Relay[]> {
    return this.http.get(`${this.relayUrl}/all`)
      .toPromise()
      .then(response => response as Relay[])
      .catch(this.handleError);
  }

  on(node: Node): Promise<boolean> {
    return this.http.get(`${this.relayUrl}/${node.ip}/on`)
      .toPromise()
      .catch(this.handleError);
  }

  off(node: Node): Promise<boolean> {
    return this.http.get(`${this.relayUrl}/${node.ip}/off`)
      .toPromise()
      .catch(this.handleError);
  }

  toggle(node: Node, channelI: number): Promise<void> {
    return this.http.get(`${this.relayUrl}/${node.ip}/toggle/${channelI}`)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('We have an error', error);
    return Promise.reject(error.message || error);
  }

}
