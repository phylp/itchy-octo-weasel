var Log = require(__dirname + '/../models/log');
var express = require('express');
var jsonParser = require('body-parser').json();
var errorHandle = require(__dirname + '/../lib/error_handle');
var logRoute = module.exports = exports = express.Router();

logRoute.get('/test', function(req, res){
  console.log('hey it works so far');
  res.end();
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

logRoute.post('/sendstuff', jsonParser, function(req, res){
  var newLog = new Log(req.body);
  newLog.save(function(err, data){
    if(err){
      console.log('shit ' + err);
      res.end();
    } else {
      res.json(data);
    }
  });
});