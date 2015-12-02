module.exports = function(app){
  app.controller('LogsController', ['$scope', 'logfactory', '$http', '$cookies', '$location', function($scope, logfactory, $http, $cookies, $location){
    $scope.logs;
    $scope.newLog = {};
    $scope.warning;
    $scope.successMsg = ''; 

    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');
    
    $http.defaults.headers.common.token = eat;
    
    $scope.getAll = function(){
      logfactory.get(function(err, data){
        if(err) return console.log(err);
        $scope.logs = data;
      });
    };

    $scope.makeLog = function(log){
      console.log(log);
      logfactory.make(log, function(err, data){
        if(err) return console.log(err);
        $scope.logs.push(data);
        log.restaurant = '';
        log.item = '';
      });
    };

    $scope.makeLog2 = function(foodLog){
    $scope.successMsg = '';                      
    $http.post('/logger/addtolog/' + foodLog.restaurant + '/' + foodLog.item)
      .then(
        function(res){
          console.log('this is the res: ' + res);
          $scope.warning = '';
          foodLog.restaurant = '';
          foodLog.item = '';
          $scope.successMsg = 'Success!!'; 
      },
        function(res){
          $scope.warning = 'Item not found. Check your spelling';
        }
      );
    };

    var oldRestaurant;
    var oldItem;

    $scope.editDelete = function(log){
      oldRestaurant = log.restaurant;
      oldItem = log.item;
      log.editing = true;
    }

    $scope.updateLog = function(log){
      logfactory.update(log, function(err, res){
        if(err) return console.log(err);
        var index = $scope.logs.indexOf(log);
        $scope.logs.splice($scope.logs[index], 1, res);
        log.editing = false;
      }); 
    };

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

