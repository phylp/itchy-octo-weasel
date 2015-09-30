module.exports = function(app){
  app.controller('LogsController', ['$scope', '$http', function($scope, $http){
    $scope.logs = [];

    $scope.getAll = function(){
      $http.get('/logger/showlogs')
      .then(function(res){
        $scope.logs = res.data; 
      }, function(res){
        console.log(res)
      });
    };

    $scope.makeLog = function(log){
      $http.post('/logger/send', log)
      .then(function(res){
        $scope.logs.push(res.data);
        $scope.newLog = null;
      },function(res){
        console.log(res) // in case of err
      });
    };

    $scope.updateLog = function(log){
      $http.put('/logger/update', log)
      .then(function(res){
        $scope.logs.push(res.data);
        log.editing = false;
        $scope.updateLog = null;
      }, function(res){
        console.log(res)
      });
    };

    $scope.removeLog = function(log){
      $http.delete('/logger/' + log._id, log)
      .then(function(){
        $scope.logs.splice($scope.logs.indexOf(log), 1);
      }, function(res){
        console.log('unable to remove note at this time')
      });
    };

  }]);
};