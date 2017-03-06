import { Injectable } from '@angular/core';
import { Relay } from './relay';


@Injectable()
export class RelayService {

  //Sample data for now
  RELAYS: Relay[] = [
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


  getRelays(): Promise<Relay[]> {
    return Promise.resolve(this.RELAYS);
  }

  toggle(relay: number, channel: number): Promise<Relay> {
    this.RELAYS[relay].channels[channel] = !this.RELAYS[relay].channels[channel];
    return Promise.resolve(this.RELAYS[relay]);
  }

}
