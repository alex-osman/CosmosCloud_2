/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NodeService } from './node.service';
import { Node } from '../node';
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
});
