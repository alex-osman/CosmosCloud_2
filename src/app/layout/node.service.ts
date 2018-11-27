import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Relay } from './relay';
import { Channel } from './channel';
import { Indicator } from './indicator';
import { Node } from './node';

// import 'rxjs/add/operator/toPromise';

@Injectable()
export class NodeService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private nodeUrl = "/api"; //Url to Node api
  // constructor(private http: Httpclient) { }
  constructor(private http: HttpClient ) { }

  getNodes(): Promise<Node[]> {
    return this.http.get(`${this.nodeUrl}/getNodes`)
      .toPromise()
      .then(response => response as Node[])
      .catch(this.handleError);
  }

  update(node: Node): Promise<Node> {
    return this.http
      .post(`${this.nodeUrl}/configureNode`, {"node": node}, { headers: this.headers })
      .toPromise()
      .then(response => response as Node)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("We have an error", error);
    return Promise.reject(error.message || error);
  }
}
