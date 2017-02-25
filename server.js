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
  console.log("Mongo is set up")
  require('./routes/nodes.js')(app, db);
});

// Load modules
require('./routes/relay.js')('/relay', app, request, MongoClient);

app.get('/test', function(req, res) {
  res.status(200).send("ok");
})

// Start server, listen to everything
var port = 8888;
server = app.listen(port, '0.0.0.0');
console.log('App listening on port ' + port);
module.exports = server;