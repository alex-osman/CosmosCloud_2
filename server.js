var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var app = express();

// Configure Express app
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '5000mb'}));
app.use(bodyParser.urlencoded({limit: '5000mb'}));

// Load modules
require('./routes/relay.js')('/relay', app, request /* TODO: Add DB connection */);

// Start server, listen to everything
var port = 8000;
app.listen(port, '0.0.0.0');
console.log('App listening on port ' + port);

