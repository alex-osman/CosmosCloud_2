import { Component, OnInit } from '@angular/core';
import { Relay } from '../relay';
import { RelayService } from '../relay.service';

@Component({
  selector: 'my-relay',
  templateUrl: './relay.component.html',
  styleUrls: ['./relay.component.css']
})
export class RelayComponent implements OnInit {
  title = "Configure Relays"
  relays: Relay[];

  constructor(private relayService: RelayService) { }

  ngOnInit() {
    this.getRelays();
  }

  getRelays(): void {
    this.relayService.getRelays().then(relays => this.relays = relays);
  }

  toggle(relay: number, channel: number): void {
    this.relayService.toggle(relay, channel).then(r => this.relays[relay] = r);
  }

}