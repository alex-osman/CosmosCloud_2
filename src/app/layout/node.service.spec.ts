/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NodeService } from './node.service';
import { Node } from './node';
import { Http, HttpModule, Headers, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('Service: NodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ 
        NodeService, 
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  describe('getNode()', () => {
    const mockNode = { 
      data: [
        {
          _id: '1',
          name: 'Test1',
          ip: '10.0.0.12',
          modules: [
            {
              type: 'indicator',
              style: 'off',
              color: [ 0, 0, 255 ]
            },
            {
              type: 'relay',
              style: 'off',
              channels: [
                {
                  name: 'Lamp',
                  isOn: false
                },
                {
                  name: 'TV',
                  isOn: false
                }
              ]
            }
          ]
        }
      ]
    };

    it('should return a Node', 
      inject([ NodeService, XHRBackend ], (nodeService, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockNode)
          })));
        });

    }));
  });
});
