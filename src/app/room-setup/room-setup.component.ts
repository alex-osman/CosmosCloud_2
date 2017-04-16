import { Component, OnInit } from '@angular/core';
import { RssiService } from '../rssi.service';

@Component({
  selector: 'app-room-setup',
  templateUrl: './room-setup.component.html',
  styleUrls: ['./room-setup.component.css']
})
export class RoomSetupComponent implements OnInit {
  message: String;
  name: String;
  currentRoom: String;
  settingUp: Boolean;

  constructor(private rssiService: RssiService) { }

  ngOnInit() {
    this.settingUp = false;
    this.getLocation();
  }

  setup(): void {
    this.settingUp = true;
    this.message = "Processing " + this.name + "...";
    this.rssiService.setupRoom()
  }

  submitRoom(): void {
    this.settingUp = false;
    this.message = "Finishing...";
    this.rssiService.submitRoom(this.name)
  }

  getLocation(): void {
    this.rssiService.getCurrentLocation()
    .then(current => {
      this.currentRoom = current
      setTimeout(() => this.getLocation(), 2000);
    });
  }



}
