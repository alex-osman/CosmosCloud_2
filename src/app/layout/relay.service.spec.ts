/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { RequestMethod, HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { RelayService } from './relay.service';
import { Relay } from './relay';

const mockRelay = {
  'id': '1',
  'type': 'relay',
  'style': 'off',
  'channels': [
    {
      'name': 'Lamp',
      'isOn': false
    },
    {
      'name': 'TV',
      'isOn': false
    }
  ]
};

describe('RelayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        RelayService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should create a service', inject([ RelayService ], (relayService) => {
    expect(relayService).toBeTruthy();
  }));

  it('should get Relay Object back', fakeAsync(
    inject([ XHRBackend, RelayService ], (mockBackend, relayService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
            new ResponseOptions({ body: mockRelay })
        ));
      });

      relayService.getRelays().then((res) => {
        expect(res).toEqual(mockRelay);
      });
    })
  ));


});
