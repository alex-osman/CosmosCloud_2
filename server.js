var app		= express();
var ping = require('ping');
var http = require('http');
var	exec = require('child_process').exec;
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

//Configure database;
MongoClient.connect('mongodb://localhost:27017/myproject', function(err, db) {
  assert.equal(null, err);
  console.log("Mongo Connection Successful")
  require('./routes/nodes.js')(db);
})


//Start server, listen to everything
var port = 8888;
app.listen(port, '0.0.0.0');
console.log("App listening on port " + port);
