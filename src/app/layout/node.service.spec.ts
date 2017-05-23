/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { RequestMethod, HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { NodeService } from './node.service';
import { Node } from './node';

const mockNode = {
  '_id': '1',
  'name': 'Test1',
  'ip': '10.0.0.12',
  'modules': [
    {
      'type': 'indicator',
      'style': 'off',
      'color': [ 0, 0, 255 ]
    },
    {
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

  it('should create a service', inject([ NodeService ], (nodeService) => {
    expect(nodeService).toBeTruthy();
  }));

  it('should get Node Object back', fakeAsync(
    inject([ XHRBackend, NodeService ], (mockBackend, nodeService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
          new ResponseOptions({ body: mockNode })
        ));
      });

      nodeService.getNodes().then((res) => {
        expect(res).toEqual(mockNode);
      });
    })
  ));

  it('should save Node', fakeAsync(
    inject([ XHRBackend, NodeService ], (mockBackend, nodeService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);

        connection.mockRespond(new Response(
          new ResponseOptions({ body: { success: true } })
        ));
      });

      let newNode = new Node();
      newNode = {
        '_id': '21',
        'name': 'Test2',
        'ip': '10.0.0.22',
        'modules': [
          {
            'type': 'indicator',
            'style': 'off',
            'color': [ 0, 0, 0 ]
          }
        ]
      };
      nodeService.update(newNode).then((res) => {
        expect(res).toEqual({ success: true });
      });
    })
  ));

});
