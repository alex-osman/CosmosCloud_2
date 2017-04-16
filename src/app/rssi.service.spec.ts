/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RssiService } from './rssi.service';

describe('RssiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RssiService]
    });
  });

  it('should ...', inject([RssiService], (service: RssiService) => {
    expect(service).toBeTruthy();
  }));
});
