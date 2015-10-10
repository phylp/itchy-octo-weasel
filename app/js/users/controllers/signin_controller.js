// module.exports = function(app){
//   app.controller('SignInController', ['$scope', '$http', '$base64', '$location', '$cookies', function($scope, $http, $base64, $location, $cookies){
//     $scope.buttonText = 'Log In';
//     $scope.user = {};
//     $scope.changePlacesText = 'Or sign up';

//     $scope.changePlaces = function(){
//       return $location.path('/signup');
//     }

//     $scope.sendToServer = function(user){
//       $http({
//         method: 'GET',
//         url: 'logger/signin',
//         headers: {
//           'Authorization': 'Basic ' + $base64.encode(user.username + ':' + user.password)
//         }
//       })
//         .then(function(res){
//           $cookies.put('eat', res.data.token);
//           $scope.getUsername() //global scope function created in logout.js
//           $location.path('/notes');
//         }, function(res){
//           console.log(res);
//         });
//     };
//   }]);
// };

module.exports = function(app) {
  app.controller('SigninController', ['$scope', '$http', '$base64', '$location', '$cookies',  function($scope, $http, $base64, $location, $cookies) {
    $scope.buttonText = 'Login';
    $scope.user = {};
    $scope.changePlacesText = 'Or Create a New User';

    $scope.changePlaces = function() {
      return $location.path('/signup');
    };

    $scope.sendToServer = function(user) {
      $http({
        method: 'GET',
        url: '/logger/signin',
        headers: {
          'Authorization': 'Basic ' + $base64.encode(user.username + ':' + user.password)
        }
      })
        .then(function(res) {
          $cookies.put('eat', res.data.token);
          $scope.getUserName();
          $location.path('/logs');
        }, function(res) {
          console.log(res);
        });
    };
  }]);
};
