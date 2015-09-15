var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Log', logSchema);