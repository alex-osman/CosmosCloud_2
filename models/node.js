var mongoose = require('mongoose');

var nodeSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: [true, 'IP Required']
  },
  room: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  modules: [{}]
});

module.exports = mongoose.model('Nodes', nodeSchema);

