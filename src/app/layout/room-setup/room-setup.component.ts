import { Component, OnInit } from '@angular/core';
import { RssiService } from './../../shared/services/rssi/rssi.service';
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
    setTimeout(() => {
      this.message = "Walk around the room"
    }, 2000)
    setTimeout(() => {
      this.message = "You may now finish room setup"
    }, 10000)
    this.rssiService.setupRoom()
  }

  submitRoom(): void {
    this.settingUp = false;
    this.message = "Finishing...";
    this.rssiService.submitRoom(this.name)
    .then(() => {
      this.getRooms();
      this.message = "Room setup complete"
    })
  }

  getLocation(): void {
    this.rssiService.getCurrentLocation()
    .then(current => {
      this.currentRoom = current
      setTimeout(() => this.getLocation(), 100000);
    });
  }

  getRooms(): void {
    console.log("getting rooms");
    this.rssiService.getRooms()
    .then(rooms => {
      this.rooms = rooms;
    });
  }

  cancel(room): void {
    this.getRooms()
  }

  save(room): void {
    delete room.edit;
    delete room.triggerObj;
    this.rssiService.update(room)
    .then(() => this.getRooms());
  }

  delete(room): void {
    this.rssiService.delete(room)
    .then(() => this.getRooms());
  }

  onGetTrigger(trigger, room, action): void {
    room[action].push(trigger.url);
    room[action + "String"].push(trigger.triggerString)
    console.log(room);
    this.save(room);
  }


}
