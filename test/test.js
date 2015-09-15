var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/logs2';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var url = 'localhost:3000/logger';
var Log = require(__dirname + '/../models/log');

describe('the models resource', function(done){
  after(function(done){
    mongoose.connection.db.dropDatabase(function(err){
      if(err){
        throw err;
      } else {
        done();
      }
    })
  })
  it('should be able to create a log', function(done){
    chai.request(url)
    .post('/sendstuff')
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