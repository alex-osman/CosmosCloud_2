import { Injectable } from '@angular/core';
import { Relay } from './relay';
import { Channel } from './channel';


@Injectable()
export class RelayService {

/*  CHANNELS: Channel[] = [{
    name: "Lamp",
    isOn: false
  }, {
    name: "Desk Lamp",
    isOn: true
  }, {
    name: "Lights",
    isOn: true
  }, {
    name: "Coffee Maker",
    isOn: false
  }]*/

  //Sample data for now
  RELAYS: Relay[] = [
    {
      id: '58b4fcc96e0a133cf5d3a890',
      name: 'Bedroom',
      channels: [{
        name: "Lamp",
        isOn: false
      }, {
        name: "Desk Lamp",
        isOn: true
      }]
    },
    {
      id: '68b4fcc96e0a133cf5d3a890',
      name: 'Kitchen',
      channels: [{
        name: "Lights",
        isOn: true
      }, {
        name: "Coffee Maker",
        isOn: false
      }]
    },
  ]


  getRelays(): Promise<Relay[]> {
    return Promise.resolve(this.RELAYS);
  }

  toggle(relay: number, channel: number): Promise<Relay> {
    this.RELAYS[relay].channels[channel].isOn = !this.RELAYS[relay].channels[channel].isOn;
    return Promise.resolve(this.RELAYS[relay]);
  }

  all(relay: Relay, allOn: boolean): Promise<Relay> {
    var i = this.RELAYS.indexOf(relay);
    this.RELAYS[i].channels[0].isOn = allOn;
    this.RELAYS[i].channels[1].isOn = allOn;
    return Promise.resolve(this.RELAYS[i]);
  }

}
