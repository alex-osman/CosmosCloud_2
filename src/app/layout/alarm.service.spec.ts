/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { RequestMethod, HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AlarmService } from './alarm.service';
import { Alarm } from './alarm';

const mockAlarm = {
  '_id': '1',
  'name': 'Living Room',
  'trigger': ['Kitchen'],
  'triggerString': ['Relay'],
  'cronDate': '12:00AM',
  'active': true
};

describe('Service: AlarmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AlarmService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should create a service', inject([ AlarmService ], (alarmService) => {
    expect(alarmService).toBeTruthy();
  }));

  it('should get Alarm Object back', fakeAsync(
    inject([ XHRBackend, AlarmService ], (mockBackend, alarmService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
          new ResponseOptions({ body: mockAlarm })
        ));
      });

      alarmService.getAlarms().then((res) => {
        expect(res).toEqual(mockAlarm);
      });
    })
  ));
});
