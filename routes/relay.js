module.exports = function (baseUrl, app, request, MongoClient) {
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
    var ip = req.params.ip;

    // TODO : GET IP FROM DB
    request('http://' + ip + '/' + action + '/' + channel, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
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
    var ip = req.params.ip;

    // TODO : GET IP FROM DB
    request('http://' + ip + '/' + action, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    });
  });
};

