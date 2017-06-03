/* tslint:disable:no-unused-variable */

import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Input } from '@angular/core';
import { RequestMethod, HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { RelayComponent } from './relay.component';
import { Relay } from '../relay';
import { RelayService } from '../relay.service';
import { ColorPickerService } from 'angular2-color-picker';
import { Node } from '../node';
import { Channel } from '../channel';


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

describe('RelayComponent', () => {
  let component: RelayComponent;
  let fixture: ComponentFixture<RelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelayComponent ],
      providers: [ RelayService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [RelayService,
      { provide: XHRBackend, useClass: MockBackend }]
    });

    const fixture = TestBed.createComponent(RelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create a relay component', () => {
    let app = new RelayComponent();
    expect(app).toBeTruthy();
  });
*/

  it('should display relay title', ()=> {
    const comp = fixture.debugElement.nativeElement;
    expect(comp.querySelector('span').textContent).toContain('{{node.name}}');
  });

  it('should have defined component', () => {
    expect(component).toBeDefined();
  });

/*
  it('should get relays', fakeAsync(inject[ XHRBackend, RelayComponent, RelayService ], (mockBackend, relayComponent, relayService) => {
    mockBackend.connection.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Get);
      connection.mockRespond(new Response(
        new ResponseOptions({ body: true})));
    });
      expect.(RequestMethod.Get).toBe(MockRelay);

  });
*/


});

/*
describe('RelayComponent', () => {
  let component: RelayComponent;
  let fixture: ComponentFixture<RelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelayComponent ],
      providers: [ RelayService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
<<<<<<< HEAD
=======
*/
>>>>>>> 7a2a34eddaf5b2a791dc6be97ce00d8e2127bd1c
