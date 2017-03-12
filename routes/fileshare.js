var assert = require('assert');
var multer = require('multer');
var fileDB;

module.exports = function(app, request, db) {
  var DIR = './assets/';
  var baseUrl = '/api/files';
  fileDB = db;

  var storage = multer.diskStorage({
    destination: function(req, file, callback) {
      if (file.mimetype == 'image/jpeg')
        callback(null, DIR + 'pictures');
      else if (file.mimetype == 'video/quicktime')
        callback(null, DIR + 'movies')
      else if (file.mimetype.indexOf('officedocument') > 0)
        callback(null, DIR + 'docs')
      else callback(null, DIR + 'files')
    },
    filename: function(req, file, callback) {
      callback(null, new Date().getTime() + "");
    }
  })
  var upload = multer({
    storage: storage,
  });


  app.post(baseUrl, upload.any(), function(req, res) {
    //Add to database
    fileDB.create({
      name: req.files[0].originalname.substring(0, req.files[0].originalname.lastIndexOf('.')),
      type: req.files[0].mimetype,
      path: req.files[0].path
    }, function(err, result) {
      if (err)
        throw err;
      console.log(result);
      res.end('File is uploaded');
    })   
  });

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
