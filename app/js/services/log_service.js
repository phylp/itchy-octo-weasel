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
  app.factory('Resource', ['$http', function($http){
    // var resource = function(resourceName){
    //   this.resource = resourceName;
    // };

    // Resource.prototype.create = function(resource, callback){
    //   $http.post('/logger/send', resource)
    //   .then(handleSuccess(callback), handleFailure(callback));
    // };

    // return function(resourceName){
    //   return new Resource(resourceName);
    // }
    var x = {name: 'phil'};
    return x;

  }])


}