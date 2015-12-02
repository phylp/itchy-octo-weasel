var handleSuccess = function(callback){
  return function(res){
    callback(null, res.data);
  }
};

var handleFailure = function(callback){
  return function(data){
    callback(data);
  }
};

module.exports = function(app){
  app.factory('logfactory', ['$http', function($http){
    
    var x = {};

    x.get = function(callback){
      $http.get('/logger/getuserlogs')
      .then(
        handleSuccess(callback),  //angular automatically puts response parameter on your callback 
        handleFailure(callback)   //in case of err
      );
    };

    x.make = function(log, callback){
      $http.post('/logger/send', log)
      .then(
        handleSuccess(callback),
        handleFailure(callback)
      );
    };

    x.update = function(log, callback){
      $http.put('/logger/update', log)
      .then(
        handleSuccess(callback),
        handleFailure(callback)
      );
    };

    x.delete = function(log, callback){
      $http.delete('/logger/' + log._id, log)
      .then(
        handleSuccess(callback),
        handleFailure(callback)
      );
    };

    return x;

  }])
}


