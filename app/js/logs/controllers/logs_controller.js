module.exports = function(app){
  app.controller('LogsController', ['$scope', 'logfactory', '$http', function($scope, logfactory, $http){
    $scope.logs = [];

    // $scope.getAll = function(){
    //   $http.get('/logger/showlogs')
    //   .then(function(res){
    //     $scope.logs = res.data; 
    //   }, function(res){
    //     console.log(res)
    //   });
    // };

    
    $scope.getAll = function(){
      logfactory.get(function(err, data){
        if(err) return console.log(err);
        $scope.logs = data;
      });
    };

    // $scope.makeLog = function(log){
    //   $http.post('/logger/send', log)
    //   .then(function(res){
    //     $scope.logs.push(res.data);
    //     // $scope.newLog = null;
    //     //$scope.getAll();
    //   },function(res){
    //     console.log(res) // in case of err
    //   });
    // };

    $scope.makeLog = function(log){
      logfactory.make(log, function(err, data){
        if(err) return console.log(err);
        $scope.logs.push(data);
        log.restaurant = '';
        log.item = '';
      });
    };

    var oldRestaurant;
    var oldItem;

    $scope.editDelete = function(log){
      oldRestaurant = log.restaurant;
      oldItem = log.item;
      log.editing = true;
    }

    // $scope.updateLog = function(log){
    //   $http.put('/logger/update', log)
    //   .then(function(res){
    //     var index = $scope.logs.indexOf(log);
    //     $scope.logs.splice($scope.logs[index], 1, res.data); //keeps data in same place
    //     log.editing = false;
    //   }, function(res){
    //     console.log(res)
    //   });
    // };

    $scope.updateLog = function(log){
      logfactory.update(log, function(err, res){
        if(err) return console.log(err);
        var index = $scope.logs.indexOf(log);
        $scope.logs.splice($scope.logs[index], 1, res);
        log.editing = false;
      }); 
    };

    // $scope.removeLog = function(log){
    //   $http.delete('/logger/' + log._id, log)
    //   .then(function(){
    //     $scope.logs.splice($scope.logs.indexOf(log), 1);
    //   }, function(res){
    //     console.log('unable to remove log')
    //   });
    // };

    $scope.removeLog = function(log){
      logfactory.delete(log, function(err, res){
        if(err) return console.log(err);
        $scope.logs.splice($scope.logs.indexOf(log),1);
      })
    }

    $scope.cancelEdit = function(log){
      log.restaurant = oldRestaurant;
      log.item = oldItem;
      log.editing = false;
    }

  }]);
};