var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var errorHandle = require(__dirname + '/../lib/error_handle');
//var httpBasic = require(__dirname + '../lib/http_basic');
var eventEmitter = require('events').EventEmitter;
var ee = new eventEmitter();

var usersRouter = module.exports = exports = express.Router();

usersRouter.post('/signup', jsonParser, function(req,res){
  var newUser = new User();
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
  ee.emit('generateHash', newUser, req, res);
});

ee.on('generateHash', function(newUser, req, res){
  newUser.generateHash(req.body.password, function(err, hash){
    if(err){
      return errorHandle(err, res);
    }
    ee.emit('save', newUser, req, res);
  });
});

ee.on('save', function(newUser, req, res){
  newUser.save(function(err, data){
    if(err){
      return errorHandle(err, res);
    }
    ee.emit('generateToken', newUser, req, res);
  });
});

// ee.on('generateToken', function(newUser, req, res){
//   newUser.generateToken(function(err, token){
//     if(err){
//       return errorHandle(err, res);
//     }
//     res.json({token:token});
//   });
// });

ee.on('generateToken', function(newUser, req, res){
  newUser.generateToken(function(err, token) {
    if (err) return handleError(err, res);
    res.json({token: token});
  });
});


//userRouter.get('/signin', httpBasic)