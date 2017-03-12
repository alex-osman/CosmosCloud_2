var assert = require('assert');
var multer = require('multer');
var fileDB;

module.exports = function(app, request, db) {
  var DIR = '../assets/files/';
  var baseUrl = '/fileShare';
  fileDB = db;

  var upload = multer({dest: DIR});

  app.get(baseUrl, function(req, res) {
    res.end('file catcher example');
  });

  app.post(baseUrl, function(req, res) {
    upload(req, res, function(err) {
      if (err) {
        return res.end(err.toString());
      }
      res.end('File is uploaded');
    });
  });

  app.use(multer({
    dest: DIR,
    rename: function(fieldname, filename) {
      return filename + Date.now();
    },
    onFileUploadStart: function(file) {
      console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function(file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path);
    }
  }));

  app.get(baseUrl + '/all', function(req, rest) {
    getFiles(function(files) {
      for (var i = 0; i < files.length; i++) {
        console.log(files[i]);
      }
    });
  });
};

var getFiles = function(callback) {
  fileDB.find({}).exec(function(err, file) {
    assert.equal(err, null);
    callback(file);
  });
};
