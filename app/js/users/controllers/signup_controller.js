module.exports = function(app){
  app.controller('SignupController', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies){
    $scope.buttonText = 'Create new user';
    $scope.confirmPassword = true; 
    $scope.user = {};
    $scope.changePlacesText = 'Or sign in';

    $scope.passwordMatch = function(user){
      return user.password === user.confirmation;
    }

    $scope.disableButton = function(user){
      return ($scope.userForm.$invalid && !$scope.passwordMatch(user));
    };

    $scope.changePlaces = function(){
      $location.path('/signin');
    };

    $scope.sendToServer = function(user){
      $http.post('/logger/signup', user)
        .then(
          function(res){
          $cookies.put('eat', res.data.token);
          $scope.getUserName();
          $location.path('logs');
          }, 
          function(res){
          console.log(res);
          }
        );
    };

  }]);
};