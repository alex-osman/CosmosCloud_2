/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RelayComponent } from './relay.component';

describe('RelayComponent', () => {
  let component: RelayComponent;
  let fixture: ComponentFixture<RelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title `Configure Relays`', () => {
    expect(component.title).toEqual('Configure Relays');
  });

  it('should render title in a h2 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    console.log(compiled);
    expect(compiled.querySelector('h2').textContent).toContain('Configure Relays');
  });
});
