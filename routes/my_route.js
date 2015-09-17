var Log = require(__dirname + '/../models/log');
var express = require('express');
var jsonParser = require('body-parser').json();
var errorHandle = require(__dirname + '/../lib/error_handle');

var logRoute = module.exports = exports = express.Router();

logRoute.get('/test', function(req, res){
  console.log('hey it works so far');
  res.send('test works');
  res.end();
});   

logRoute.post('/test1', jsonParser, function(req, res){
  var newLog = new Log(req.body);
  newLog.save(function(err, data){
    if(err){
      console.log(err);
      res.end();
    } else {
      res.json(data);
    }
  });
});

logRoute.get('/showlogs', function(req,res){
  Log.find({}, function(err, data){
    if(err){
      return errorHandle(err, res);
    }
    console.log('success!')
    res.json(data);
  });
});

logRoute.get('/showitems/:id', function(req, res){
  Log.find({_id: req.params.id}, function(err, data){
    if(err){
      return errorHandle(err);
    }
    console.log('works'); 
    res.json(data);
  });
});

logRoute.delete('/:id', function(req,res){
  Log.remove({_id: req.params.id}, function(err){
    if(err){
      return errorHandle(err, res);
    }
    res.json({msg: 'sucessfully deleted'});
  });
});

logRoute.post('/send', jsonParser, function(req, res){
  var newLog = new Log(req.body);
  newLog.save(function(err, data){
    if(err){
      errorHandle(err);
    } else {
      res.json(data);
    }
  });
});


logRoute.get('/showfavres', function(req, res){
  var raw = Log.find({restaurant: 'mcdons'}, function(err, data){
    if(err){errorHandle(err);
    } else {
      var x = data.filter(function(thing){return thing.item === 'friez'});
      res.json(x);
    }
  });
});  

