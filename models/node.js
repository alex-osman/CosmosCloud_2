var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var nodeSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: [true, 'IP Required']
  },
  name: {
    type: String,
    default: ""
  },
  modules: {
    rype: [String],
    default: []
  }
});

module.exports = mongoose.model('Nodes', nodeSchema);

