/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FileshareComponent } from './fileshare.component';

describe('FileshareComponent', () => {
  let component: FileshareComponent;
  let fixture: ComponentFixture<FileshareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileshareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
