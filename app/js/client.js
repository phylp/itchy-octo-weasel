require ('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');
require('./uppercaser.js');
var angular = window.angular;

var foodApp = angular.module('foodApp', ['ngRoute', 'base64', 'ngCookies', 'uppercaser']);

require('./services/services')(foodApp);
require('./directives/directives')(foodApp);
require('./logs/logs')(foodApp);
require('./users/users')(foodApp);
require('./logout')(foodApp);
require('./router')(foodApp);

