require ('angular/angular');
var foodApp = angular.module('foodApp', []);


require('./services/services')(foodApp);
require('./logs/logs')(foodApp);
//require('./directives/my-directive');

