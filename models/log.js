var mongoose = require('mongoose');
// var validate = require('mongoose-validate');

var logSchema = new mongoose.Schema({
  restaurant: {type: String, required: true},
  item: {type: String, required: true},
  author: {type: String, default: 'anonymous'},
  date: {type: Date, default: Date.now},
  author2: {type: String, default: 'anonymous'}
});


module.exports = mongoose.model('FoodLog', logSchema);