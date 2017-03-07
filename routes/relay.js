var assert = require('assert');
var Node;
var port = '8080';

module.exports = function(app, request, n) {
  var baseUrl = '/relay';
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

      request('http://' + node.ip + ':' + port + '/' + action + '/' + channel, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body);
        } else {
          res.statusCode(500).send({error: error});
        }
      });
    });
  });

  /*
   * Send the :action to all relays of :id
   * @param {String} :id - The id from the database of the computer we will be communicating with
   * @param {String} :action - The action we will take on the relay
   * @param {String} :channel - The channel of the relay we intend to take the action on
   * @return {TODO} TODO
   */
  app.get(baseUrl + '/:id/:action', function(req, res) {
    var action = req.params.action;
    var id = req.params.id;

    getIpFromId(id, function(err, node) {
      assert.equal(err, null);

      request('http://' + node.ip + ':' + port + '/' + action, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body);
        }
      });
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

