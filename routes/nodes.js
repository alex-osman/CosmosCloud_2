var assert = require('assert');
var Node;

module.exports = function(app, n) {
  Node = n;

  // Node is asking for modules
  app.get('/api/connect', function(req, res) {
    connect(req.ip, function(modules) {
      res.send(modules);
    });
  });

  // Return all nodes
  app.get('/api/getNodes', function(req, res) {
    getNodes(function(nodes) {
      res.send(nodes);
    });
  });

  // User submits settings of a new node
  app.post('/api/configureNode', function(req, res) {
    var node = req.body.node;

    configureNode(node, function(result) {
      res.send(result);
    });
  });

  // User deletes a node
  app.post('/api/deleteNode', function(req, res) {
    var node = req.body.node;

    deleteNode(node, function(result) {
      res.send(result);
    });
  });
};

// Takes the ip of a node
// Sets it up with the correct modules
var connect = function(ip, callback) {
  // Check database for information about ip
  lookupIP(ip, function(dbNodes) {
    if (dbNodes.length === 1) {
      var node = dbNodes[0];

      // Send modules to start
      if (node.modules.length > 0) {
        console.log('Starting ' + node.name);
        callback(node.modules);
      } else {
        // This pi hasn't been set up yet
        console.log('Input settings for ' + ip + ' on the website');
        callback('NO MODULES');
      }
    } else if (dbNodes.length === 0) {
      // Get information from user
      console.log('Adding ' + ip + ' to the db');
      addIP(ip, function(status) {
        callback(status);
      });
    } else {
      // More than one node with the same IP
      // This is a problem
      console.log(dbNodes);
      console.log('Database is configured improperly');
    }
  });
};

// Adds settings to the database
var configureNode = function(node, callback) {
  Node.update({ 'ip': node.ip }, node, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
};

// Removes node from the database
var deleteNode = function(node, callback) {
  Node.remove({ 'ip': node.ip }, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
};

// Adds a new ip to the database
var addIP = function(ip, callback) {
  Node.create({ 'ip': ip }, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
};

// Looks up an ip in the database
var lookupIP = function(ip, callback) {
  Node.find({
    'ip': ip
  }).exec(function(err, nodes) {
    assert.equal(err, null);
    callback(nodes);
  });
};

var getNodes = function(callback) {
  Node.find().exec(function(err, nodes) {
    assert.equal(err, null);
    callback(nodes);
  });
};
