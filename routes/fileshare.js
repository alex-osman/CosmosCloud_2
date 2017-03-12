var assert = require('assert');
var multer = require('multer');
var fs = require('fs');
var fileDB;

module.exports = function(app, request, db) {
  var DIR = './src/assets/';
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
      filetype: req.files[0].mimetype,
      path: req.files[0].path,
      size: req.files[0].size,
      extension: req.files[0].originalname.substring(req.files[0].originalname.lastIndexOf('.'))
    }, function(err, result) {
      if (err)
        throw err;
      console.log(result);
      res.end('File is uploaded');
    })   
  });

  app.get(baseUrl + '/all', function(req, res) {
    getFiles(function(files) {
      res.json(files);
    });
  });

  app.delete(baseUrl + '/:id', function(req, res) {
    fileDB.find({_id: req.params.id}, function(err, files) {
      console.log(files);
      var path = files[0].path;
      console.log(path);
      fs.unlink(path, function(err) {
        if (err)
          throw err;
        fileDB.find({_id: req.params.id}).remove().exec(function(err, response) {
          if (err)
            throw err;
          res.send(response);
        })
      })
    })
  })
};

var getFiles = function(callback) {
  fileDB.find({}).exec(function(err, file) {
    assert.equal(err, null);
    callback(file);
  });
};
