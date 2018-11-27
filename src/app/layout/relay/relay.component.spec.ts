/* tslint:disable:no-unused-variable */

import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, destroyPlatform } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { ColorPickerModule } from 'angular2-color-picker';

import { NodeService } from '../node.service';
import { RelayService } from '../relay.service';
import { RelayComponent } from './relay.component';

import { Node } from '../node';
import { Relay } from '../relay';

let newNode = new Node();
newNode = {
  '_id': '21',
  'name': 'Test2',
  'ip': '10.0.0.22',
  'modules': [
    {
      'id': '1',
      'type': 'relay',
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

let newRelay = new Relay();
newRelay = {
  'id': '1',
  'type': 'relay',
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

class MockNodeService {
  public getNodes(): Promise<Node[]> {
    const nodes: Node[] = new Array<Node> (newNode);

    return Promise.resolve(nodes);
  }
}

class MockRelayService {
  public getRelays(): Promise<Relay[]> {
    const relays: Relay[] = new Array<Relay> (newRelay);

    return Promise.resolve(relays);
  }
}

describe('Component: Relay Component', () => {
  let component: RelayComponent;
  let relayService: RelayService;
  let nodeService: NodeService;
  let fixture: ComponentFixture<RelayComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ RelayComponent ],
      providers: [
        { provide: NodeService, useClass: MockNodeService },
        { provide: RelayService, useClass: MockRelayService },
      ],
    });
    fixture = TestBed.createComponent(RelayComponent);
    component = fixture.componentInstance;
    relayService = TestBed.get(RelayService);
    nodeService = TestBed.get(NodeService);
    de = fixture.debugElement;
    el = de.nativeElement;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

});



