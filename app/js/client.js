require ('angular/angular');

var foodApp = angular.module('foodApp', []);

foodApp.controller('foodController', ['$scope', function($scope){
  $scope.greeting = 'hello world';
}]);
