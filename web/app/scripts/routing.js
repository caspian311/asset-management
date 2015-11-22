(function() {
  'use strict';

  var app = angular.module('assets');

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/login', {
          templateUrl: 'scripts/login/login.html',
          controller: 'LoginCtrl'
        }).
        when('/home', {
          templateUrl: 'scripts/home/home.html',
          controller: 'HomeCtrl'
        }).
        otherwise({
          redirectTo: '/login'
        });
    }]);
})();

