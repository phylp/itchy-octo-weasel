module.exports = function(app){
  app.config(['$routeProvider', function($route){
    $route
      .when('/logs', {
        templateUrl: '/templates/logs/views/logs_view.html'
      })
      .when('/signup', {
        templateUrl: '/templates/users/views/signupin_view.html',
        controller: 'SignupController'
      })
      .when('/signin', {
        templateUrl: 'templates/users/views/signupin_view.html',
        controller: 'SigninController'
      })
      .when('/logs', {
        templateUrl: 'templates/home.html',
        controller: 'LogsController'
      })
      .when('/landing', {
        templateUrl: 'templates/landing.html',
      })
      .otherwise({
        redirectTo: '/landing'
      })
  }]);
};