var mongoose = require('mongoose');

var portSchema = new mongoose.Schema({
  relay: {
    type: String,
    required: [true, 'IP Port Required']
  },
  rgb: {
    type: String,
    default: [true, 'RGB Port Required']
  }
});

module.exports = mongoose.model('Ports', portSchema);
