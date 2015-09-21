var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/fast_food_log';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var eatauth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');

describe('httpbasic', function(){
  it('should be able to parse auth header', function(){
    var req = {
      headers: {
        authorization: 'Basic ' + (new Buffer('test:testing555')).toString('base64') 
      }
    };

    httpBasic(req, {}, function(){
      expect(typeof req.auth).to.eql('object');
      expect(req.auth.username).to.eql('test');
      expect(req.auth.password).to.eql('testing555');
    });
  });
});

describe('auth', function(){
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  it('should be able to create user', function(done){
    chai.request('localhost:3000/logger')
      .post('/signup')
      .send({username: 'testuser2', password: 'testpw'})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.token).to.have.length.above(0);
        done();
      });
  });

  describe('user already in DB', function(){
    before(function(done){
      var user = new User();
      user.username = 'test2';
      user.basic.username = 'test2';
      user.generateHash('testing555', function(err, res){
        if(err) throw err;
        user.save(function(err,data){
          if(err) throw err;
          user.generateToken(function(err, token){
            if(err) throw err;
            this.token = token;
            done();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    });

    it('should be able to sign in', function(done){
      chai.request('localhost:3000/logger')
      .get('/signin')
      .auth('/test', 'testing555')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.token).to.have.length.above(0);
      })
      done();
    });
  });
})

