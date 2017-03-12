var mongoose = require('mongoose');

var fileshareSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name required']
  },
  filetype: {
    type: String,
    required: [true, 'filetype required']
  },
  path: {
    type: String,
    required: [true, 'path required']
  },
  size: {
    type: Number,
    required: [true, 'size required']
  }
}, { collection : 'fileshare' });

module.exports = mongoose.model('Fileshare', fileshareSchema);
