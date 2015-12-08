var Log = require(__dirname + '/../models/log');
var User = require(__dirname + '/../models/user');
var express = require('express');
var jsonParser = require('body-parser').json();
var errorHandle = require(__dirname + '/../lib/error_handle');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var logRoute = module.exports = exports = express.Router();

logRoute.get('/showlogs', jsonParser, eatAuth, function(req, res) {
  Log.find({username: req.user.username}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

logRoute.get('/showlog/:id', function(req, res){
  Log.find({_id: req.params.id}, function(err, data){
    if(err){
      return errorHandle(err);
    } 
    res.json(data);
  });
});

logRoute.get('/showres/:id', function(req, res){
  var raw = Log.find({restaurant: req.params.id}, function(err, data){
    if(err){errorHandle(err);
    } else {
      res.json(data);
    }
  });
});

logRoute.get('/showitem/:id', function(req, res){
  Log.find({item: req.params.id}, function(err, data){
    if(err){errorHandle(err);
    } else {
      var itemDates = '';
      data.forEach(function(item){
        itemDates += item.date + '\n';
      });
      res.json('\n' + req.params.id + '\n' + itemDates);
    }
  });
}); 

logRoute.get('/showfavorite', function(req,res){
  Log.find({}, function(err, data){
    var resMap = {};
    if(err){
      errorHandle(err)
    } else {
      data.forEach(function(item){
        if(resMap[item['restaurant']]){
          resMap[item['restaurant']]++;
        } else {
          resMap[item['restaurant']] = 1;
        }
      })       
    }
      var favorite;
      var greatest = 0;
      console.log(resMap);
      for(var key in resMap){
        if(resMap[key] > greatest){
          greatest = resMap[key];
          favorite = key;
        }
      }
      res.send(favorite);
  })
})   

logRoute.put('/update', jsonParser, function(req, res){
  console.log(req.body);
  User.findOne({_id: req.body.userID}, function(err, log){
    if(err) errorHandle(err);
    console.log('!!!!!!!!!!!! ' + log)
    //if(!!req.body.restaurant) log.restaurant = req.body.restaurant;
    //if(!!req.body-parser.item) log.item = req.body.item;
    log.save(function(err, data){
      if(err){
        errorHandle(err);
      }
      res.json(log);
    })
  })
});

logRoute.post('/send', jsonParser, eatAuth, function(req, res) {
  var newLog = new Log(req.body);
  newLog.author = req.user.username;
  newLog.save(function(err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});

logRoute.patch('/remove', jsonParser, function(req,res){
  console.log(req.body);
  var targetName = req.body.username;
  var targetIndex = req.body.index;
  var targetString = 'logs.' + targetIndex
  var projection = {};
  projection[targetString] = null;
  User.update({username: targetName}, {$set: projection}, function(err, data){
    if(err) console.log('dayum');
    console.dir(data);
  });
  User.update({username: targetName}, {$pull: {logs: null}}, function(err, data){
    if(err) console.log('dayum');
    console.dir(data);
  });
  res.end();
});


// logRoute.get('/showlogs', function(req,res){
//   console.log(req.user);

//   Log.find({author: req.username}, function(err, res){
//      // console.log(req);
//     if(err){
//       return errorHandle(err, data);
//     }
//     res.json(data);
//   });sss
// });

// logRoute.post('/send', jsonParser, function(req, res){
//   console.log(req.body);
//   var newLog = new Log(req.body);
//   newLog.author = req.body.username;
//   newLog.save(function(err, data){
//     if(err){
//       errorHandle(err);
//     } else {
//       res.json(data)
//     }
//   });
// });