  var mongoose = require('mongoose');     
var bcrypt = require('bcrypt');
var eat = require('eat');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  basic: {
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
  },
  logs: [
    {
      fooditem: {type: mongoose.Schema.Types.ObjectId, ref: 'Food'},
      date: {type: Date, default: Date.now}
    }
  ]

});

userSchema.plugin(uniqueValidator);

userSchema.methods.generateHash = function(password, callback){
  bcrypt.hash(password, 6, function(err, hash){
    if(err){
      return callback(err)
    }
    this.basic.password = hash;
    callback(null, hash); 
  }.bind(this));
};

userSchema.methods.compareHash = function(password, callback){
  bcrypt.compare(password, this.basic.password, callback);
};

userSchema.methods.generateToken = function(callback){
  eat.encode({id: this._id}, process.env.APP_SECRET, callback);
};

module.exports = mongoose.model('User', userSchema);

