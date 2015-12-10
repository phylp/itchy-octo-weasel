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
        for(var i = 0; i < $scope.logs.length; i++){
          $scope.logs[i].index = i;
        }
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
          if($scope.successMsg === 'Success!!'){
            $scope.getAll();
          } 
      },
        function(res){
          $scope.warning = 'Item not found. Check your spelling';
        }
      );
    };

    var oldRestaurant;
    var oldItem;

    $scope.editDelete = function(log){
      //oldRestaurant = log.restaurant;
      //oldItem = log.item;
      log.editing = true;
    }

    // $scope.updateLog = function(log){
    //   log.date = $scope.tempDate;
    //   console.dir('tempdate: ' + log);
    //   logfactory.update(log, function(err, res){
    //     if(err) return console.log(err);
    //     var index = $scope.logs.indexOf(log);
    //     $scope.logs.splice($scope.logs[index], 1, res);
    //     log.editing = false;
    //   }); 
    // };

    $scope.updateLog = function(log){
      var myTempDate = document.getElementById("dateField").value;
      alert(myTempDate);
      var myHeader = {};
      myHeader.username = log.username;
      myHeader.index = log.index;
      myHeader.date = myTempDate;
      $http.patch('/logger/update', myHeader)
      .then(
        console.log('date change failed'),
        $scope.getAll()
      )
    }

    $scope.removeLog = function(log){
      log.editing = false;
      var targetIndex = log.index;
      $http.patch('/logger/remove', log)
      .then(
        console.log('fail'),
        $scope.getAll()
      );
    };

    $scope.cancelEdit = function(log){
      log.editing = false;
    }
  }]);
};

