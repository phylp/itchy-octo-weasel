var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/logs2');

var logRouter = require(__dirname + '/routes/my_route');
app.use('/logger', logRouter);

var port = process.env.PORT || 3000;
app.listen(port, function (){
  console.log('the server is running at port ' + port);
});