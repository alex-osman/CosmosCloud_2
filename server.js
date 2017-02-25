var app = require('express')();
var bodyParser = require('body-parser');
var assert = require('assert');
var request = require('request');
app.use(bodyParser.json());

var mongoose = require("mongoose");
var promise = require('bluebird');
mongoose.Promise = promise;
mongoose.connect("mongodb://localhost:27017/cosmos");
console.log("Mongodb connected");

// Models
var Node = require('./models/node.js');

// Load modules
require('./routes/relay.js')(app, request, Node);
require('./routes/nodes.js')(app, Node);

// Start server, listen to everything
var port = 8888;
app.listen(port, '0.0.0.0');
console.log('App listening on port ' + port);

