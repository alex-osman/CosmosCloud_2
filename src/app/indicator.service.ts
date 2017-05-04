import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Indicator } from './indicator';
import { Node } from './node';


@Injectable()
export class IndicatorService {

  private headers = new Headers({'Content-Type': 'application/json'})
  private indicatorUrl = "/rgb";

  constructor(private http: Http) { }

  getIndicators(): Promise<Indicator[]> {
    return this.http.get(`${this.indicatorUrl}/all`)
      .toPromise()
      .then(response => response.json() as Indicator[])
      .catch(this.handleError);
  }

  setColor(color: number[], id: string): Promise<any> {
    const url = `${this.indicatorUrl}/${id}/on/${color[0]}/${color[1]}/${color[2]}`
    return this.http.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("We have an error", error);
    return Promise.reject(error.message || error);
  }

}
