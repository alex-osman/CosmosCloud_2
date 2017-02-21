var app = require('express')();
var bodyParser = require('body-parser');
// var exec = require('child_process').exec;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var request = require('request');
app.use(bodyParser.json());

// Configure database;
MongoClient.connect('mongodb://localhost:27017/cosmos', function(err, db) {
  assert.equal(null, err);
  console.log('Mongo Connection Successful');
  require('./routes/nodes.js')(app, db);
});

// Load modules
require('./routes/relay.js')('/relay', app, request, MongoClient);

// Start server, listen to everything
var port = 8888;
app.listen(port, '0.0.0.0');
console.log('App listening on port ' + port);

