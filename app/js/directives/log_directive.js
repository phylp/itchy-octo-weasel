module.exports = function(app){
  console.log('does this display')
  app.directive('simplething', function(){
    return {
      restrict: 'AEC',
      templateUrl: 'templates/directives/mylogs.html',
      controller: 'LogsController'
    }
  })
}
