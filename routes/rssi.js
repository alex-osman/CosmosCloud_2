const assert = require('assert');
const baseUrl = '/rssi';

module.exports = function(app, request, r) {

  let min = [100, 100, 100]
  let max = [0, 0, 0]
  let addingRoom = false;
  
  let current = [];
  let currentRoom = null;
  let rooms = [];

  //Get all rooms in the database
  r.find({}, (err, dbRooms) => {
    assert.equal(err, null)
    this.rooms = dbRooms;
  })

  app.get(baseUrl + '/:one/:two/:three', function(req, res) {
    current = [req.params.one, req.params.two, req.params.three];
    
    //Update the min and max if we're adding a room
    if (addingRoom) {
      updateMaxMin();
    }

    //Update what room they are in
    inRooms = [];
    this.rooms.forEach((room) => {
      if (current[0] >= room.min[0] && current[0] <= room.max[0])
        if (current[1] >= room.min[1] && current[1] <= room.max[1])
          if (current[2] >= room.min[2] && current[2] <= room.max[2])
            inRooms.push(room);
    })
    if (inRooms.length === 1) {
      //We are in a single room
      if (currentRoom != inRooms[0]) {
        //We are leaving `currentRoom` and entering inRooms[0]
        console.log("entering " + inRooms[0].name)
        enter(inRooms[0])
        leave(currentRoom)
      }
      currentRoom = inRooms[0];
    }
    res.send('Got it');
  })

  app.get(baseUrl + '/currentLocation', function(req, res) {
    if (currentRoom)
      res.send(currentRoom.name);
    else res.send("Location unknown");
  })

  app.get(baseUrl + '/setup/', function(req, res) {
    addingRoom = true;
    res.send('Setting up new room');
  })

  app.get(baseUrl + '/finish/:roomName', function(req, res) {
    addingRoom = false;
    let room = {
      name: req.params.roomName,
      max,
      min
    }
    
    r.create(room, (err, result) => {
      assert.equal(err, null);
      res.send('Added ' + room.name);
    })    
  })

  let updateMaxMin = () => {
    current.map((val, i) => {
      if (val > 0) {
        max[i] = Math.max(current[i], max[i])
        min[i] = Math.min(current[i], min[i])
      }
    })
  }

  let enter = (room) => {
    if (!room)
      return;
    room.enter.forEach((url) => {
      request("http://" + url, (err, res) => {
        if (err)
          throw err;
        console.log(res.body);
        console.log('Entered ' + room.name);
      })
    })
  }

  let leave = (room) => {
    if (!room)
      return;
    room.leave.forEach((url) => {
      request("http://" + url, (err, res) => {
        if (err)
          throw err;
        console.log(res.body);
        console.log('Entered ' + room.name);
      })
    })
  }
}