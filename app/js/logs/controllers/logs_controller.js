module.exports = function(app){
  app.controller('LogsController', ['$scope', '$http', function($scope, $http){
    $scope.logs = [];
    $scope.test = 'greetings from test';

    $scope.getAll = function(){
      $http.get('/logger/showlogs')
      .then(function(res){
        $scope.logs = res.data; 
      }, function(res){
        console.log(res)
      });
    };

    $scope.makeLog = function(log){
      //$scope.logs.push(log);
      $http.post('/logger/send', log)
      .then(function(res){
        //$scope.logs.push(res.data);
        // $scope.newLog = null;
        $scope.getAll();
      },function(res){
        console.log(res) // in case of err
      });
    };

    var oldRestaurant;
    var oldItem;

    $scope.updateLog = function(log){
      oldRestaurant = log.restaurant;
      oldItem = log.item;
      $http.put('/logger/update', log)
      .then(function(res){
        $scope.logs.splice($scope.logs.indexOf(log), 1); //trial
        $scope.logs.push(res.data);
      }, function(res){
        console.log(res)
      });
    };

    $scope.removeLog = function(log){
      $http.delete('/logger/' + log._id, log)
      .then(function(){
        $scope.logs.splice($scope.logs.indexOf(log), 1);
      }, function(res){
        console.log('unable to remove log')
      });
    };

    $scope.cancelEdit = function(log){
      log.restaurant = oldRestaurant;
      log.item = oldItem;
      log.editing = false;
    }

  }]);
};