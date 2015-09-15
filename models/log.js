var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
  name: String,
  age: {type: Number, min: 18}
});

module.exports = mongoose.model('Log', logSchema);