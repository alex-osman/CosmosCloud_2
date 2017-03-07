var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.Promise = promise;
mongoose.connect('mongodb://localhost:27017/cosmos');
console.log('Mongodb connected');

// Models
var Node = require('./models/node.js');
var Ports = require('./models/ports.js');

// Load modules
require('./routes/relay.js')(app, request, Node);
require('./routes/rgb.js')(app, request, Node, Ports);
require('./routes/nodes.js')(app, Node);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

// Start server, listen to everything
var port = 4200;
server = app.listen(port, '0.0.0.0');
console.log('App listening on port ' + port);
module.exports = server;