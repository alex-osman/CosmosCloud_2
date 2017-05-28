/* tslint:disable:no-unused-variable */
//TODO: Get toogle tests to work properly, double check on the on and off tests


import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { RequestMethod, HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { RelayService } from './relay.service';
import { Relay } from './relay';
import { Node } from './node';
import { Channel } from './channel';

const mockChannel = [
  {
    'name': 'Lamp',
    'isOn': false
  },
  {
    'name': 'TV',
    'isOn': false
  }
]

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

let mockNode = new Node();
mockNode = {
  '_id': '2',
  'name': 'Test',
  'ip': '10.0.0.2',
  'modules': [
    {
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

  it('should set Relay Object to on', fakeAsync(
    inject([ XHRBackend, RelayService ], (mockBackend, relayService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
          new ResponseOptions({ body: true })
        ));
      });

      relayService.on(mockNode).then((res) => {
        expect(res).toBe(true);
      });
    })
  ));

  it('should set Relay Object to off', fakeAsync(
    inject([ XHRBackend, RelayService ], (mockBackend, relayService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
          new ResponseOptions({ body: true })
        ));
      });

      relayService.off(mockNode).then((res) => {
        expect(res).toBe(true);
      });
    })
  ));
/*
  it('should toggle Relay of a certain channel', fakeAsync(
    inject([ XHRBackend, RelayService ], (mockBackend, relayService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
          new ResponseOptions({ body: true })
        ));
      });

      relayService.toggle(mockNode, 1).then((res) => {
        expect(res).toBe(true);
      });
    })
  ));
*/ 

});
