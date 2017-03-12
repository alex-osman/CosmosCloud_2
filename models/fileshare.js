var mongoose = require('mongoose');

var fileshareSchema = new mongoose.Schema({
  File: [{
    name: String,
    type: String,
    path: String
  }]
});

module.exports = mongoose.model('Fileshare', fileshareSchema);
