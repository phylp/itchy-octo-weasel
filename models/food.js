var mongoose = require('mongoose');
// var validate = require('mongoose-validate');

var foodSchema = new mongoose.Schema({
  restaurant: {type: String, required: true},
  item: {type: String, required: true},
  calories: {type: Number, required: true}
});


module.exports = mongoose.model('Food', foodSchema);