require ('angular/angular');
var foodApp = angular.module('foodApp', []);

require('./services/services')(foodApp);
require('./directives/directives')(foodApp);
require('./logs/logs')(foodApp);

