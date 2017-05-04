/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IndicatorService } from './indicator.service';

describe('IndicatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndicatorService]
    });
  });

  it('should ...', inject([IndicatorService], (service: IndicatorService) => {
    expect(service).toBeTruthy();
  }));
});
