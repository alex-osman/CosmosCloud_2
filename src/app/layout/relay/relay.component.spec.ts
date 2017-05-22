/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http, HttpModule, Headers, Response, RequestMethod, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';

import { RelayComponent } from './relay.component';
import { RelayService } from '../relay.service';
import { Relay } from '../relay';
import { Channel } from '../channel';
import { Node } from '../node';
import { NodeService } from '../node.service';

describe('RelayComponent', () => {
  let mockBackend: MockBackend;
  let component: RelayComponent;
  let fixture: ComponentFixture<RelayComponent>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelayComponent ],
      providers: [ 
        RelayService, 
        NodeService, 
        BaseRequestOptions, 
        MockBackend, 
        {
          provide: Http,
          deps: [ MockBackend, BaseRequestOptions ],
          useFactory: (defaultOptions: BaseRequestOptions, backend: XHRBackend) => {
              return new Http(backend, defaultOptions);
          } 
        }
      ],
      imports: [ FormsModule, HttpModule ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  
});
