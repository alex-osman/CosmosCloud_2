import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';
import { Alarm } from './alarm';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AlarmService {

  private headers = new Headers({ 'Content-Type': 'application/json'});
  private alarmUrl = '/alarm';

  constructor(private http: HttpClient) { }

  getAlarms(): Promise<Alarm[]> {
    return this.http.get(`${this.alarmUrl}/getAlarms`)
      .toPromise()
      .then(response => response as Alarm[])
      .catch(this.handleError);
  }

  addAlarm(): Promise<void> {
    return this.http.get(`${this.alarmUrl}/addAlarm`)
      .toPromise()
      .then(response => ({}))
      .catch(this.handleError);
  }

  update(alarm) {
    return this.http.post(`${this.alarmUrl}/updateAlarm`, {'alarm': alarm})
      .toPromise()
      // .then(response => {})
      // .catch(this.handleError);
  }

  delete(alarmId): Promise<void> {
    return this.http.delete(`${this.alarmUrl}/${alarmId}`)
      .toPromise()
      .then(response => ({}))
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.log("We have an error", error);
    return Promise.reject(error.message || error);
  }
}
