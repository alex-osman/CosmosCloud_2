/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RequestMethod, HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { RssiService } from '../rssi.service';
import { Room } from '../room';
import { RoomSetupComponent } from './room-setup.component';

const mockRoom = {
  '_id': '1',
  'name': 'Kitchen lights',
  'enter': ['Kitchen', 'Relay'],
  'leave': ['Kitchen', 'Relay']
};

describe('RoomSetupComponent', () => {
  let component: RoomSetupComponent;
  let fixture: ComponentFixture<RoomSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create a room component', () => {
    let app = new RoomSetupComponent();
    expect(app).toBeTruthy();
  });

*/

  it('should have defined component', () => {
    expect(component).toBeDefined();
  });

});
