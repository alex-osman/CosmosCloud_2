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
  app.get(baseUrl + '/:id/:style', function(req, res) {
    var style = req.params.style;
    getPort(function(ports) {
      getRgbIP(function(rgbIP) {
        rgbIP.forEach(function(ip, index) {
          console.log('http://' + ip.ip + ':' + ports.rgb + '/' + style);
          request('http://' + ip.ip + ':' + ports.rgb + '/' + style, function(err, response, body) {
            if (index == rgbIP.length-1) {
              if (!err && response.statusCode === 200) {
                console.log(body);
                res.send(body);
              } else {
                console.log(err);
                res.send(err);
              }
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
  app.get(baseUrl + '/:id/:style/:red/:green/:blue', function(req, res) {
    var style = req.params.style;
    var r = req.params.red;
    var g = req.params.green;
    var b = req.params.blue;
    getPort(function(ports) {
      getRgbIP(function(rgbIP) {
        rgbIP.forEach(function(ip, index) {
          if (ip._id == req.params.id) {
            console.log('http://' + ip.ip + ':' + ports.rgb + '/' + style + '/' + r + '/' + g + '/' + b);
            request('http://' + ip.ip + ':' + ports.rgb + '/' + style + '/' + r + '/' + g + '/' + b, function(err, response, body) {
              if (!err && response.statusCode === 200) {
                //  console.log(body);
                res.send(body);
              } else {
                console.log(err);
              }
            });
          }
        });
      });
    });
  });

  app.get(baseUrl + '/all', function(req, res) {
    getRgbIP(function(nodes) {
      indicators = [];
      for (var i = 0; i < nodes.length; i++) {
        console.log(nodes[i])
        for (var j = 0; j < nodes[i].modules.length; j++) {
          if (nodes[i].modules[j].type == 'indicator') {
            indicators.push({
              id: nodes[i]._id,
              style: nodes[i].modules[j].style,
              type: 'indicator',
              color: nodes[i].modules[j].color,
            })
          }
        }
      }
      res.send(indicators);
    })
  })


};

//  Get all the Ips that have a RGB module tied to them
var getRgbIP = function(callback) {
  nodeDB.find({'modules.type': 'indicator'}).exec(function(err, ip) {
    assert.equal(err, null);
    callback(ip);
  });
};

//  Get the ports for specific modules
var getPort = function(callback) {
  portDB.find({}).exec(function(err, ports) {
    assert.equal(err, null);
    callback(ports[0]);
  });
};
