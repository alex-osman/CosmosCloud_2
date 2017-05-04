/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RelayService } from './relay.service';

describe('RelayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelayService]
    });
  });

  it('should ...', inject([RelayService], (service: RelayService) => {
    expect(service).toBeTruthy();
  }));
});
