const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

const mongoose = require('mongoose');
const promise = require('bluebird');
mongoose.Promise = promise;
mongoose.connect('mongodb://localhost:27017/cosmos');
console.log('Mongodb connected');

// Models
const Node = require('./models/node.js');
const Ports = require('./models/ports.js');
const Files = require('./models/fileshare.js');
const Room = require('./models/room.js')

// Load modules
require('./routes/relay.js')(app, request, Node);
require('./routes/rgb.js')(app, request, Node, Ports);
require('./routes/nodes.js')(app, Node);
require('./routes/fileshare.js')(app, request, Files);
require('./routes/rssi.js')(app, request, Room);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start server, listen to everything
const port = 4200;
server = app.listen(port, '0.0.0.0');
console.log('App listening on port ' + port);
module.exports = server;
