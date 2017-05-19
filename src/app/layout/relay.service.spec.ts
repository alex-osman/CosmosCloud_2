/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Http, Headers } from '@angular/http';
import { RelayService } from './relay.service';
import { Relay } from './relay';
import { Channel } from './channel';
import { Node } from './node';

describe('RelayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelayService, Http]
    });
  });

});
