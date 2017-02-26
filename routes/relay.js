var Node;
var port = '8080';

module.exports = function (app, request, n) {
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

      request('http://' + node.ip + ':' + port + '/' + action + '/' + channel, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body);
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
  app.get(baseUrl + '/:id/:action', function (req, res) {
    var action = req.params.action;

    getIpFromId(id, function(err, node) {
      assert.equal(err, null);

      request('http://' + ip + ':' + port + '/' + action, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body);
        }
      });
    });
  });
};

var getIpFromId = function(id, cb) {
  Node.find({
    '_id' : ObjectId(id)
  }).exec(function(err, node) {
    cb(err, node);
  });
};

