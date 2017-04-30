import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../alarm.service';
import { Alarm } from '../alarm';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {
  message: String;
  alarms: Alarm[];


  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.message = "Init";
    this.getAlarms();
  }

  getAlarms(): void {
    this.message = "Fetching...";
    this.alarmService.getAlarms()
    .then(alarms => this.alarms = alarms)
  }

  cancel(alarm): void {
    this.getAlarms();
  }

  save(alarm): void {
    delete alarm.edit;
    this.alarmService.update(alarm)
    .then(() => this.getAlarms());
  }

  activate(alarm): void {
    this.alarmService.activate(alarm)
    .then(() => this.getAlarms());
  }

}
