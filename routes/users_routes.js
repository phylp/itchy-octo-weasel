var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var errorHandle = require(__dirname + '/../lib/error_handle');
var httpBasic = require(__dirname + '/../lib/http_basic');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var eventEmitter = require('events').EventEmitter;
var ee = new eventEmitter();
var Food = require(__dirname + '/../models/food');


var usersRouter = module.exports = exports = express.Router();

/* ======================== SIGN UP ======================== */

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

ee.on('generateToken', function(newUser, req, res){
  newUser.generateToken(function(err, token) {
    if (err){
      return handleError(err, res);
    }
    res.json({token: token});
  });
});

/* ======================== SIGN IN ======================== */
var user;

usersRouter.get('/signin', httpBasic, function(req, res){
  User.findOne({'basic.username': req.auth.username}, function(err, user){
    if(err) return errorHandle(err, res);
    if(!user){
      console.log('could not authenticate: ' + req.auth.username);
      return res.status(401).json({msg: 'could not authenticate'});
    }
    console.log('got here');
   ee.emit('compareHash', req, res, user); 
  });
});

ee.on('compareHash', function(req, res, user){
  user.compareHash(req.auth.password, function(err, hashRes){
    if(!hashRes){
      console.log('could not authenticate: ' + req.auth.username);
      return res.status(401).json({msg: 'could not authenticate'});
    }
    ee.emit('generateToken2', req, res, user);
  });
});

ee.on('generateToken2', function(req, res, user){
  user.generateToken(function(err, token){
    if(err){
      return errorHandle(err, res);
    }
    res.json({token: token});
  });
});


/* ================ GET USER NAME ====================== */
usersRouter.get('/username', jsonParser, eatAuth, function(req, res) {
  res.json({username: req.user.username});
});

/* ================ ADD FOOD REF TO USER LOGS ====================== */
// usersRouter.post('/addtolog/:item', jsonParser, eatAuth, function(req, res) {
  
//   var thingToAdd;

//   Food.findOne({item: req.params.item}, function(err, thing){
//       if(err) errorHandle(err);
//       thingToAdd = thing._id;
//   });

//   User.findOne({username: req.user.username}, function(err, user){
//     if(err) errorHandle(err);
//     user.logs.push(thingToAdd);
//     user.save(function(err){
//       if(err) errorHandle(err);
//     });
//     res.json(user);
//   })

// });

//ADD LOG TO USER 
usersRouter.post('/addtolog/:restaurant/:item', jsonParser, eatAuth, function(req, res) {
  
  var thingToAdd;

  Food.findOne({restaurant: req.params.restaurant, item: req.params.item}, function(err, thing){
      if(err) errorHandle(err);
      if(!thing){
        res.status(400).json({msg: "bad input"});
        return console.log('client sent bad input')
      }
      thingToAdd = thing._id;
  });

  User.findOne({username: req.user.username}, function(err, user){
    if(err) errorHandle(err);
    if(thingToAdd){
      user.logs.push({fooditem: thingToAdd});
      user.save(function(err){
        if(err) errorHandle(err);
      });
      res.json(user);
    }
  })
});

//RETRIEVE LOGS FROM USER
usersRouter.get('/getuserlogs', jsonParser, eatAuth, function(req, res){
  
  // var initialLogs = [];
  // User.findOne({username: req.user.username}, function(err, user){
  //   if(err) errorHandle(err);
  //   for(var i = 0; i < user.logs.length; i++){
  //     //console.log(user.logs[i] + ' first clog');
  //     initialLogs.push(user.logs[i]);
  //   };
  //   console.log('initial LOGS:' + initialLogs)
  //   ee.emit('initialLogsComplete', initialLogs, req, res);
  // });

  User.findOne({username: req.user.username}, function(err, user){
    if(err) errorHandle(err);
    var initialLogs = user.logs;
    console.log(initialLogs)
    ee.emit('initialLogsComplete', initialLogs, req, res);
  });   

});

ee.on('initialLogsComplete', function(initialLogs, req, res){
  var secondLogs = [];
  
  function createLogs(){
    console.log('inside create logs function');
    console.log('length: ' + initialLogs.length);
    if(initialLogs.length){  
      Food.findOne({_id: initialLogs[0].fooditem}, function(err, data){
        if(err)errorHandle(err);
          secondLogs.push({restaurant: data.restaurant});
          initialLogs.shift();
          createLogs();
      });
    } else {
    ee.emit('finalizeFoodList', secondLogs, req, res)
    }
  }
  createLogs();
});
  

ee.on('finalizeFoodList', function(secondLogs, req, res){
  console.log('final part ' + secondLogs[0]);
  console.log(secondLogs.length);
  console.log(secondLogs);
  res.end();
});




