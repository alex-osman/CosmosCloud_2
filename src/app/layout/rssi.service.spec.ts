/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { RequestMethod, HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { RssiService } from './rssi.service';
import { Room } from './room';

const mockRoom = {
  '_id': '1',
  'name': 'Kitchen lights',
  'enter': ['Kitchen', 'Relay'],
  'leave': ['Kitchen', 'Relay']
};

describe('RssiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        RssiService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should create a service', inject([ RssiService ], (rssiService) =>{
    expect(rssiService).toBeTruthy();
  }));

  it('should get Location', fakeAsync(
    inject([ XHRBackend, RssiService ], (MockBackend, rssiService) => {
      MockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
          new ResponseOptions({})
        ));
      });

      rssiService.getCurrentLocation().then((res) => {{
        expect(res).toBeDefined();
      }});

    })
  ));

  it('should get Room Object back', fakeAsync(
    inject([ XHRBackend, RssiService ], (mockBackend, rssiService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
          new ResponseOptions({ body: mockRoom })
        ));
      });

      rssiService.getRooms().then((res) => {
        expect(res).toEqual(mockRoom);
      });
    })
  ));

  it('should delete Room Object', fakeAsync(
    inject([ XHRBackend, RssiService ], (mockBackend, rssiService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Delete);

        connection.mockRespond(new Response(
          new ResponseOptions({ status: 204 })
        ));
      });

      let newRoom = new Room();
      newRoom = {
          '_id': '1',
          'name': 'Living Room',
          'enter': ['Relay', 'On'],
          'leave': ['Relay', 'Off']
      };
      rssiService.delete(newRoom).then((res) => {
        expect(res).toBeDefined();
        expect(res.status).toBe(204);
      });
    })
  ));

});
