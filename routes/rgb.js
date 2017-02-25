var assert = require('assert');

module.exports = function(baseUrl, app, request, MongoClient) {
  app.get(baseUrl + '/:node/:style', function(req, res) {
    var style = req.params.style;
    getPort(function(ports) {
      getRgbIP(function(rgbIP) {
        rgbIP.forEach(function(ip) {
          //  console.log('http://' + ip.ip + ':' + ports.rgb + '/' + style);
          request('http://' + ip.ip + ':' + ports.rgb + '/' + style, function(err, response, body) {
            if (!err && response.statusCode === 200) {
              console.log(body);
              res.send(body);
            } else {
              console.log(err);
            }
          });
        });
      });
    });
  });

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
              console.log(body);
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

var getRgbIP = function(callback) {
  var collection = db.collection('nodes');
  collection.find({'modules.type': 'rgb'}).toArray(function(err, ip) {
    assert.equal(err, null);
    callback(ip);
  });
};
var getPort = function(callback) {
  var collection = db.collection('ports');
  collection.findOne({}, function(err, ports) {
    assert.equal(err, null);
    callback(ports);
  });
};
