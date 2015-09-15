var mongoose = require('mongoose');
var validate = require('mongoose-validate');

var logSchema = new mongoose.Schema({
  restaurant: {type: String, validate:[validate.alpha, 'is not a restaurant']},
  item: {type: String, validate:[validate.alpha, 'is not a menu item']},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('FoodLog', logSchema);