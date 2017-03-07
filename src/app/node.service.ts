import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Relay } from './relay';
import { Channel } from './channel';
import { Indicator } from './indicator';
import { Node } from './node';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class NodeService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private nodeUrl = "/api"; //Url to Node api
  constructor(private http: Http) { }

  getNodes(): Promise<Node[]> {
    return this.http.get(`${this.nodeUrl}/getNodes`)
      .toPromise()
      .then(response => response.json() as Node[])
      .catch(this.handleError);
  }

  update(node: Node): Promise<Node> {
    return this.http
      .post(`${this.nodeUrl}/configureNode`, {"node": node}, this.headers)
      .toPromise()
      .then(response => response.json() as Node)
      .catch(this.handleError);
  }




  private handleError(error: any): Promise<any> {
    console.log("We have an error", error);
    return Promise.reject(error.message || error);
  }

}
