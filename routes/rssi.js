const assert = require('assert');
const baseUrl = '/rssi';

module.exports = (app, request, r) => {

  let min = [100, 100, 100]
  let max = [0, 0, 0]
  let addingRoom = false;
  
  let current = [];
  let currentRoom = null;
  let rooms = [];

  //Get all rooms in the database
  let getAllRooms = () => {
    r.find({}, (err, dbRooms) => {
      assert.equal(err, null)
      this.rooms = dbRooms;
      setTimeout(() => getAllRooms(), 5000);
    })
  }
  getAllRooms();

  app.get(baseUrl + '/:one/:two/:three', (req, res) => {
    current = [parseInt(req.params.one), parseInt(req.params.two), parseInt(req.params.three)];
    //Update the min and max if we're adding a room
    if (addingRoom) {
      updateMaxMin();
    }

    inRooms = [];
    //Update what room they are in
    if (Number.isNaN(current[1])) {
      //One RSSI Signal
      this.rooms.forEach((room) => {
        if (current[0] >= room.min[0] && current[0] <= room.max[0])
          inRooms.push(room);
      })
    } else {
      //Three RSSI Signals
      this.rooms.forEach((room) => {
        if (current[0] >= room.min[0] && current[0] <= room.max[0])
          if (current[1] >= room.min[1] && current[1] <= room.max[1])
            if (current[2] >= room.min[2] && current[2] <= room.max[2])
              inRooms.push(room);
      })
    }
    if (inRooms.length === 1) {
      //We are in a single room
      if (currentRoom == null) {
        enter(inRooms[0]);
      } else if (currentRoom._id != inRooms[0]._id) {
        //We are leaving `currentRoom` and entering inRooms[0]
        leave(currentRoom)
        enter(inRooms[0])
      }
    }
    console.log(inRooms.map(x => x.name));
    res.send('Got it');
  })

  app.get(baseUrl + '/currentLocation', (req, res) => {
    if (currentRoom)
      res.send(currentRoom.name);
    else res.send("Location unknown");
  })

  app.get(baseUrl + '/setup/', (req, res) => {
    addingRoom = true;
    res.send('Setting up new room');
  })

  app.get(baseUrl + '/finish/:roomName', (req, res) => {
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

  app.post(baseUrl + '/updateRoom', (req, res) => {
    let room = req.body.room;
    console.log(room);
    r.update({_id: room._id}, room, (err, result) => {
      console.log(err);
      assert.equal(err, null);
      console.log(result);
    })
    res.send("okay");
  })

  app.get(baseUrl + '/getRooms', (req, res) => {
    r.find({}, (err, rooms) => {
      assert.equal(err, null);
      res.send(rooms);
    })
  })

  app.delete(baseUrl + '/:id', (req, res) => {
    console.log(req.params.id);
    r.remove({_id: req.params.id}, (err, result) => {
      assert.equal(err, null);
      console.log(result.result)
      res.send("deleted");
    }).catch((err) => res.err(err));
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
    currentRoom = room;
    /*room.enter.forEach((url) => {
      request(url, (err, res) => {
        if (err)
          throw err;
      })
    })*/
    console.log('Entered ' + room.name);
  }

  let leave = (room) => {
    if (!room)
      return;
    /*room.leave.forEach((url) => {
      request(url, (err, res) => {
        if (err)
          throw err;
      })
    })*/
    console.log('Left ' + room.name);
  }
}