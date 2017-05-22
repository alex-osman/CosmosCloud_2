/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { RequestMethod, HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { NodeService } from './node.service';
import { Node } from './node';

const mockNode = { 
  "_id": '1',
  "name": 'Test1',
  "ip": '10.0.0.12',
  "modules": [
    {
      "type": 'indicator',
      "style": 'off',
      "color": [ 0, 0, 255 ]
    },
    {
      "type": 'relay',
      "style": 'off',
      "channels": [
        {
          "name": 'Lamp',
          "isOn": false
        },
        {
          "name": 'TV',
          "isOn": false
        }
      ]
    }
  ]
};

describe('Service: NodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ 
        NodeService, 
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should get Node back', fakeAsync(
    inject([ XHRBackend, NodeService ], (mockBackend, nodeService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
          new ResponseOptions({ body: mockNode })
        ));
      });

      nodeService.getNodes().then((res) =>{
        expect(res).toEqual(mockNode);
      });


    })
  ));
});
