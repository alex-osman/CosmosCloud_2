/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RelayComponent } from './relay.component';
import { Relay } from '../relay';
import { RelayService } from '../relay.service';
import { ColorPickerService } from 'angular2-color-picker';

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
