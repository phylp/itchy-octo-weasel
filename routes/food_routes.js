var Food = require(__dirname + '/../models/food');
var express = require('express');
var jsonParser = require('body-parser').json();
var errorHandle = require(__dirname + '/../lib/error_handle');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var foodRoute = module.exports = exports = express.Router();

foodRoute.post('/sendfood', jsonParser, function(req, res) {
  var newFood = new Food(req.body);
  newFood.save(function(err, data) {
    if (err) errorHandle(err, res);
    res.json(data);
  });
});

