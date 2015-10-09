var mongoose = require('mongoose');
var validate = require('mongoose-validate');

var logSchema = new mongoose.Schema({
  restaurant: {type: String, required: true},
  item: {type: String, required: true},
  date: {type: Date, default: Date.now},
  author: {type: String, default: 'anonymous'}
});


module.exports = mongoose.model('FoodLog', logSchema);