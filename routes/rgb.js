var assert = require('assert');
var portDB;
var nodeDB;

module.exports = function(app, request, n, p) {
  var baseUrl = '/rgb';
  nodeDB = n;
  portDB = p;
  /*
   * Send the :style to a specific :node
   * @param {String} :node - The node that we want to communicate with
   * @param {String} :style - The style for the indicator
   * @return {TODO} TODO
  */
  app.get(baseUrl + '/:node/:style', function(req, res) {
    var style = req.params.style;
    getPort(function(ports) {
      getRgbIP(function(rgbIP) {
        rgbIP.forEach(function(ip) {
          //  console.log('http://' + ip.ip + ':' + ports.rgb + '/' + style);
          request('http://' + ip.ip + ':' + ports.rgb + '/' + style, function(err, response, body) {
            if (!err && response.statusCode === 200) {
              //  console.log(body);
              res.send(body);
            } else {
              console.log(err);
            }
          });
        });
      });
    });
  });

  /*
   * Send the :style to a specific :node
   * @param {String} :node - The node that we want to communicate with
   * @param {String} :style - The style for the indicator
   * @param {String} :red - The rgb color code for red
   * @param {String} :green - The rgb color code for green
   * @param {String} :blue - The rgb color code for blue
   * @return {TODO} TODO
  */
  app.get(baseUrl + '/:node/:style/:red/:green/:blue', function(req, res) {
    var style = req.params.style;
    var r = req.params.red;
    var g = req.params.green;
    var b = req.params.blue;
    getPort(function(ports) {
      getRgbIP(function(rgbIP) {
        rgbIP.forEach(function(ip) {
          //  console.log('http://' + ip.ip + ':' + ports.rgb + '/' + style + '/' + r +'/' + g + '/' + b);
          request('http://' + ip.ip + ':' + ports.rgb + '/' + style + '/' + r + '/' + g + '/' + b, function(err, response, body) {
            if (!err && response.statusCode === 200) {
              //  console.log(body);
              res.send(body);
            } else {
              console.log(err);
            }
          });
        });
      });
    });
  });
};

//  Get all the Ips that have a RGB module tied to them
var getRgbIP = function(callback) {
  nodeDB.find({'modules.type': 'rgb'}).exec(function(err, ip) {
    assert.equal(err, null);
    callback(ip);
  });
};

//  Get the ports for specific modules
var getPort = function(callback) {
  portDB.findOne({}, function(err, ports) {
    assert.equal(err, null);
    callback(ports);
  });
};
