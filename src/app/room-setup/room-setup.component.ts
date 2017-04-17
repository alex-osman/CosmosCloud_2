import { Component, OnInit } from '@angular/core';
import { RssiService } from '../rssi.service';
import { Room } from '../room';

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
  rooms: Room[];

  constructor(private rssiService: RssiService) { }

  ngOnInit() {
    this.settingUp = false;
    this.getRooms();
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
    this.rssiService.submitRoom(this.name).then(() => this.getRooms())
  }

  getLocation(): void {
    this.rssiService.getCurrentLocation()
    .then(current => {
      this.currentRoom = current
      setTimeout(() => this.getLocation(), 100000);
    });
  }

  getRooms(): void {
    this.rssiService.getRooms()
    .then(rooms => {
      rooms.forEach((room) => this.parseTrigger('enter', room))
      rooms.forEach((room) => this.parseTrigger('leave', room))
      this.rooms = rooms;
    });
  }

  cancel(room): void {
    this.getRooms()
  }

  save(room): void {
    delete room.edit;
    this.rssiService.update(room)
    .then(() => this.getRooms());
  }

  delete(room): void {
    this.rssiService.delete(room)
    .then(() => this.getRooms());
  }

  parseTrigger(enterOrLeave, room): void {
    room[enterOrLeave].forEach((url) => {
      let path = url.substring(url.indexOf(':4200') + 6);
      let params = path.split('/');
      if (params.length === 3 || params.length === 4) {
        if (params[0] === 'relay') {
          //params = {"0": relay, "1": ip, "2": action, ("3": channel)}
          //Check if all channels or only one
          if (params.length === 3) {
            //All channels
            if (params[2] === 'toggle') {
              room[enterOrLeave + '_read'] = 'Toggle ' + params[1];
            } else {
              room[enterOrLeave + '_read'] = 'Turn ' + params[1] + ' ' + params[2];
            }
          } else {
            //One channel
            if (params[2] === 'toggle') {
              room[enterOrLeave + '_read'] = 'Toggle ' + params[1] + ':' + params[3];
            } else {
              room[enterOrLeave + '_read'] = 'Turn ' + params[1] + ':' + params[3] + ' ' + params[2];
            }
          }
        }
      }
    })

  }


}
