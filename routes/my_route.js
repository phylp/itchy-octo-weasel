var Log = require(__dirname + '/../models/log');
var express = require('express');
var jsonParser = require('body-parser').json();
var errorHandle = require(__dirname + '/../lib/error_handle');

var logRoute = module.exports = exports = express.Router();

logRoute.get('/showlogs', function(req,res){
  Log.find({}, function(err, data){
    if(err){
      return errorHandle(err, res);
    }
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
  Log.findOne({_id: req.body._id}, function(err, log){
    if(err) errorHandle(err);
    if(!!req.body.restaurant) log.restaurant = req.body.restaurant;
    if(!!req.body.item) log.item = req.body.item;
    log.save(function(err, data){
      if(err){
        errorHandle(err);
      }
      res.json(log);
    })
  })
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

logRoute.delete('/:id', function(req,res){
  Log.remove({_id: req.params.id}, function(err){
    if(err){
      return errorHandle(err, res);
    }
    res.json({msg: 'sucessfully deleted'});
  });
});