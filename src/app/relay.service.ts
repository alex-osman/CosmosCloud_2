import { Injectable } from '@angular/core';
import { Relay } from './relay';

//Sample data for now
const RELAYS: Relay[] = [
  {
    id: '58b4fcc96e0a133cf5d3a890',
    name: 'Bedroom',
    channels: [true, false]
  },
  {
    id: '68b4fcc96e0a133cf5d3a890',
    name: 'Kitchen',
    channels: [false, false]
  },
]

@Injectable()
export class RelayService {

  getRelays(): Promise<Relay[]> {
    return Promise.resolve(RELAYS);
  }

}
