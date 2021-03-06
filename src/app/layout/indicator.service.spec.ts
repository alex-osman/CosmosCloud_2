/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { RequestMethod, HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { IndicatorService } from './indicator.service';
import { Indicator } from './indicator';

const mockIndicator = {
  'id': '1',
  'style': 'off',
  'type': 'indicator',
  'color': [ 255, 255, 255 ]
};

describe('Service: IndicatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        IndicatorService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should create a service', inject([ IndicatorService ], (indicatorService) => {
    expect(indicatorService).toBeTruthy();
  }));

  it('should get Indicator Object back', fakeAsync(
    inject([ XHRBackend, IndicatorService ], (mockBackend, indicatorService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
          new ResponseOptions({ body: mockIndicator })
        ));
      });

      indicatorService.getIndicators().then((res) => {
        expect(res).toEqual(mockIndicator);
      });
    })
  ));

  it('should set Color', fakeAsync(
    inject([ XHRBackend, IndicatorService ], (mockBackend, indicatorService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
          new ResponseOptions({ status: 200 })
        ));
      });

      indicatorService.setColor([0, 0, 255], 3).then((res) => {
        expect(res.status).toEqual(200);
      })
    })
  ))

});
