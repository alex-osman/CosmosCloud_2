var assert = require('assert');
var baseUrl = '/relay';
var port = '8080';
var Node;

module.exports = function(app, request, n) {
  Node = n;

  /*
   * Send the :action to the specified :channel relay of :id
   * @param {String} :id - The id from the database of the computer we will be communicating with
   * @param {String} :action - The action we will take on the relay
   * @param {String} :channel - The channel of the relay we intend to take the action on
   * @return {TODO} TODO
   */
  app.get(baseUrl + '/:id/:action/:channel', (req, res) => {
    var channel = req.params.channel;
    var action = req.params.action;
    var id = req.params.id;
    getIpFromId(id, function(err, node) {
      assert.equal(err, null);

      relayCall(node.ip, port, action, channel)
        .then(function(response) {
          res.send(response);
        })
        .catch(function(err) {
          res.status(404).send(err);
        });
    });
  });

  /*
   * Send the :action to all relays of :id
   * @param {String} :id - The id from the database of the computer we will be communicating with
   * @param {String} :action - The action we will take on the relay
   * @return {TODO} TODO
   */
  app.get(baseUrl + '/:id/:action', function(req, res) {
    var action = req.params.action;
    var id = req.params.id;

    getIpFromId(id, function(err, node) {
      assert.equal(err, null);

      relayCallWithoutChannel(node.ip, port, action)
        .then(function(response) {
          res.send(response);
        })
        .catch(function(err) {
          res.status(404).send(err);
        });
    });
  });
};

var relayCallWithoutChannel = function(ip, port, action) {
  return relayCall(ip, port, action, "");
};

var relayCall = function(ip, port, action, channel) {
  return new Promise(function(resolve, reject) {
    request('http://' + node.ip + ':' + port + '/' + action + '/' + channel, function(err, res) {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });

  app.get(baseUrl + '/all', function(req, res) {
    getRelays(function(nodes) {
      res.send(nodes);
    })
  })

};



//  Get all the Ips that have a Relay module tied to them
var getRelays = function(callback) {
  Node.find({'modules.type': 'relay'}).exec(function(err, nodes) {
    assert.equal(err, null);
    relays = [];
    for (var i = 0; i < nodes.length; i++) {
      relays.push({
        id: nodes[i]._id,
        name: nodes[i].name,
        channels: [{
          name: nodes[i].modules[1].channels[0].name,
          isOn: nodes[i].modules[1].channels[0].isOn,
        }, {
          name: nodes[i].modules[1].channels[1].name,
          isOn: nodes[i].modules[1].channels[1].isOn,
        }]
      })
    }
    callback(relays);
  });
};

var getIpFromId = function(id, cb) {
  Node.findById(id).exec(function(err, node) {
    cb(err, node);
  });
};

