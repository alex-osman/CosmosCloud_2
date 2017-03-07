import { Injectable } from '@angular/core';
import { Indicator } from './indicator';

//Sample data for now
const INDICATORS: Indicator[] = [
  {
    id: '58b4fcc96e0a133cf5d3a890',
    type: "indicator",
    name: 'Bedroom',
    style: 'off',
    color: [144, 10, 0]
  },
  {
    id: '68b4fcc96e0a133cf5d3a890',
    type: "indicator",
    name: 'Kitchen',
    style: 'on',
    color: [255, 255, 255]
  },
]


@Injectable()
export class IndicatorService {

  getIndicators(): Promise<Indicator[]> {
    return Promise.resolve(INDICATORS);
  }

}
