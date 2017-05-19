/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RoomSetupComponent } from './room-setup.component';

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

});
