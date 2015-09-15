var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
  restaurant: String,
  item: String,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('FoodLog', logSchema);