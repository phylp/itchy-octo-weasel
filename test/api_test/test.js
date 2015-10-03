var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/fast_food_log';
require(process.env.PWD + '/server.js');
var mongoose = require('mongoose');
var url = 'localhost:3000/logger';
var Log = require(__dirname + '/../../models/log');
var errorHandle = require(__dirname + '/../../lib/error_handle')

describe('the models resource', function(done){
  after(function(done){
    mongoose.connection.db.dropDatabase(function(err){
      if(err){
        errorHandle(err);
      } else {
        done();
      }
    });
  });
  it('should be able to create a log', function(done){
    chai.request(url)
    .post('/send')
    .send({restaurant:'McDonalds', item: 'Big Mac'})
    .end(function(err, res){
      expect(res.body.restaurant).to.eql('McDonalds');
      expect(res.body.item).to.eql('Big Mac');
      done();
    });
  });
  it('should be able to show database values', function(done){
    chai.request(url)
    .get('/findstuff')
    .end(function(err, res){
      expect(res).to.not.eql(null);
      done();
    })
  })
});
