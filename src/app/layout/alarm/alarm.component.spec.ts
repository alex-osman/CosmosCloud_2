/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, destroyPlatform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'angular2-color-picker';

import { AlarmComponent } from './alarm.component';
import { AlarmService } from '../alarm.service';
import { Alarm } from '../alarm';
import { TriggerModule } from './../../shared';

let newAlarm = new Alarm();
newAlarm = {
  '_id': '1',
  'name': 'Living Room',
  'trigger': ['Kitchen'],
  'triggerString': ['Relay'],
  'cronDate': '12:00AM',
  'active': true
};


class MockAlarmService {
  public getAlarms(): Promise<Alarm[]> {
    const alarms: Alarm[] = new Array<Alarm> (newAlarm);

    return Promise.resolve(alarms);
  }
}

describe('Component: AlarmComponent', () => {
  let fixture: ComponentFixture<AlarmComponent>;
  let alarmService: AlarmService;
  let component: AlarmComponent;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, TriggerModule, ColorPickerModule ],
      declarations: [ AlarmComponent ],
      providers: [ {provide: AlarmService, useClass: MockAlarmService} ],
    });
    fixture = TestBed.createComponent(AlarmComponent);
    component = fixture.componentInstance;
    alarmService = TestBed.get(AlarmService);
    de = fixture.debugElement;
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });


});
