import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../alarm.service';
import { Alarm } from '../alarm';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {
  alarms: Alarm[];

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.getAlarms();
  }

  getAlarms(): void {
    this.alarmService.getAlarms()
    .then(alarms => this.alarms = alarms)
  }

  cancel(alarm): void {
    this.getAlarms();
  }

  save(alarm): void {
    delete alarm.edit;
    if (alarm.newTime) {
      alarm.cronDate = '0 ' + alarm.newTime.substring(3) + ' ' + alarm.newTime.substring(0, 2) + ' * * *';
      delete alarm.newTime;
    }
    alarm.trigger = alarm.trigger.filter(x => x.length > 0);
    this.alarmService.update(alarm)
    .then(() => this.getAlarms());
  }

  activate(alarm): void {
    this.alarmService.activate(alarm)
    .then(() => this.getAlarms());
  }

  getTime(cronDate): Date {
    let times = cronDate.split(' ').map(x => x == '*' ? 0 : x);
    return new Date(2017, 1, 1, times[2], times[1], 0, 0);
  }

}
