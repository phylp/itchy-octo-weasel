var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/fast_food_log');
process.env.APP_SECRET = process.env.APP_SECRET || 'crazyawesome';

app.use(express.static(__dirname + '/build'));

var logRouter = require(__dirname + '/routes/my_route');
app.use('/logger', logRouter);

var userRouter = require(__dirname + '/routes/users_routes');
app.use('/logger', userRouter);

var port = process.env.PORT || 3000;
app.listen(port, function (){
  console.log('the server is running at port ' + port);
});
