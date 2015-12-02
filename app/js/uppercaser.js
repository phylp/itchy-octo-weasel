angular.module('uppercaser', []).filter('uc', function (){
  return function(input){
    return input.replace(input[0], input[0].toUpperCase());
  };
});